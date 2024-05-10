'use server'
import bcrypt from 'bcrypt'
import { signIn, signOut } from "@/lib/api/auth/auth";
import { handleError } from "@/lib/errorHandler";
import { User } from "@/lib/api/users/userSchema";
import { connectToDb } from "@/lib/mongo";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { AppFormState } from "@/lib/types/types";
import { appMessages } from "@/lib/api/appMessages";
import { authMessages } from "@/lib/api/auth/authMessages";

export const loginWithGitHub = async () => {
    await signIn("github")
}

export const loginWithCredentials = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {username, password} = Object.fromEntries(data)

    try {
        await signIn("credentials", {id: username, password})
        return { success: true}
    } catch (error: any) {
        if(error.message.includes('CredentialsSignin')) {
            console.log('*** Login Credentials: ', error)
            return { error: authMessages.invalidCredentials }
        }

        if(error.message.includes('NEXT_REDIRECT')) {
            throw error
        }

        return { error: appMessages.generalError }
    }
}

export const logout = async () => {
    try {
        await signOut()
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, error)
    }
}

export const register = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {username, email, password} = Object.fromEntries(data)

    const userExistsMessage = await handleExistingUser(username, email)

    if(userExistsMessage) {
        return { error: userExistsMessage }
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)
    const cloudinaryAPIResponse = await uploadImageToCloudinary(data) as UploadApiResponse

    try {
        const newUser = new User({
            username, email, password: hashedPassword, image: cloudinaryAPIResponse.url
        })
        await newUser.save()
        return { success: true }
    } catch (error: any) {
        return { error: appMessages.generalError }
        // handleError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, error)
    }
}

const handleExistingUser = async (username: File | string, email: File | string) => {
    await connectToDb()

    const userWithExistingUsername = await User.findOne({username})
    if(userWithExistingUsername) {
        return authMessages.userExists
    }

    const userWithExistingEmail = await User.findOne({email})
    if(userWithExistingEmail) {
        return authMessages.emailIsInUse
    }
}

const uploadImageToCloudinary = async (data: FormData) => {
    const imageFile = data.get('image') as File
    const imageArrayBuffer = await imageFile.arrayBuffer()
    const imageUint8Array = new Uint8Array(imageArrayBuffer)

    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve(result)
        }).end(imageUint8Array);
    });
}
