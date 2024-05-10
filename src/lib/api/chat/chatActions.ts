import { connectToDb } from "@/lib/mongo";
import { handleError } from "@/lib/errorHandler";
import { User } from "@/lib/api/users/userSchema";
import { StatusCodes } from "http-status-codes";
import { userMessages } from "@/lib/api/users/userMessages";
import { Post } from "@/lib/api/posts/postSchema";
import { revalidatePath } from "next/cache";
import { AppFormState } from "@/lib/types/types";
import { UserDto } from "@/lib/api/users/userDto";
import { ChatDto } from "@/lib/api/chat/chatDto";
import { Chat } from "@/lib/api/chat/chatSchema";

export const getChats = async (): Promise<ChatDto[] | undefined> => {
    try {
        await connectToDb()
        const chats = await Chat.find()
        return chats.map(chat => chat as ChatDto)
    } catch (error: any) {
        console.log('Error on getChats', error)
        // handleError(StatusCodes.INTERNAL_SERVER_ERROR, userMessages.displayAllUsersError, error)
    }
}

export const getChat = async (id: string) => {
    try {
        await connectToDb()
        return await Chat.findById(id)
    } catch (error: any) {
        console.log('Error on getChat', error)
        // handleError(StatusCodes.INTERNAL_SERVER_ERROR, userMessages.displayUserError(id), error)
    }
}

export const createChat = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {userId, name} = Object.fromEntries(data)
    try {
        await connectToDb()
        const newChat = new Chat({userId, name, members: [userId]})
        await newChat.save()

        revalidatePath('/chat')
        return { success: true }
    } catch (error: any) {
        return { error: userMessages.createUserError }
    }
}

// export const updateUser = async (previousState: Awaited<AppFormState>, data: FormData) => {
//     const {id, username, email, image, isAdmin} = Object.fromEntries(data)
//     try {
//         console.log('*** Update User: ', {username, email, image, isAdmin})
//         await connectToDb()
//         const user = await User.findOneAndUpdate({id}, {username, email, image, isAdmin})
//
//         revalidatePath('/admin')
//         return { success: true }
//     } catch (error: any) {
//         return { error: userMessages.createUserError }
//     }
// }
//
// export const deleteUser = async (previousState: Awaited<AppFormState>, data: FormData) => {
//     const {id} = Object.fromEntries(data)
//     try {
//         await connectToDb()
//         await Post.deleteMany({userId: id})
//         await User.findOneAndDelete({id})
//
//         revalidatePath('/admin')
//         return { success: true }
//     } catch (error: any) {
//         return { error: userMessages.deleteUserError(id as string) }
//     }
// }