import { connectToDb } from "@/lib/mongo";
import { handleError } from "@/lib/errorHandler";
import { User } from "@/lib/api/users/userSchema";
import { StatusCodes } from "http-status-codes";
import { userMessages } from "@/lib/api/users/userMessages";
import { Post } from "@/lib/api/posts/postSchema";
import { revalidatePath } from "next/cache";
import { AppFormState } from "@/lib/types/types";
import { UserDto } from "@/lib/api/users/userDto";

export const getUsers = async (): Promise<UserDto[] | undefined> => {
    try {
        await connectToDb()
        const users = await User.find()
        return users.map(user => user as UserDto)
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, userMessages.displayAllUsersError, error)
    }
}

export const getUser = async (id: string) => {
    try {
        await connectToDb()
        return await User.findById(id)
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, userMessages.displayUserError(id), error)
    }
}

export const createUser = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {username, email, password, image, isAdmin} = Object.fromEntries(data)
    try {
        await connectToDb()
        const newUser = new User({username, email, password, image, isAdmin})
        await newUser.save()

        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: userMessages.createUserError }
    }
}

export const updateUser = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {id, username, email, image, isAdmin} = Object.fromEntries(data)
    try {
        console.log('*** Update User: ', {username, email, image, isAdmin})
        await connectToDb()
        const user = await User.findOneAndUpdate({id}, {username, email, image, isAdmin})

        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: userMessages.createUserError }
    }
}

export const deleteUser = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {id} = Object.fromEntries(data)
    try {
        await connectToDb()
        await Post.deleteMany({userId: id})
        await User.findOneAndDelete({id})

        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: userMessages.deleteUserError(id as string) }
    }
}