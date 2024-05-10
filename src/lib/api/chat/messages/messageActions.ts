import { connectToDb } from "@/lib/mongo";
import { handleError } from "@/lib/errorHandler";
import { User } from "@/lib/api/users/userSchema";
import { StatusCodes } from "http-status-codes";
import { userMessages } from "@/lib/api/users/userMessages";
import { Post } from "@/lib/api/posts/postSchema";
import { revalidatePath } from "next/cache";
import { AppFormState } from "@/lib/types/types";
import { UserDto } from "@/lib/api/users/userDto";
import { MessageDto } from "@/lib/api/chat/messages/messageDto";
import { Message } from "@/lib/api/chat/messages/messageSchema";

export const getMessages = async (chatId: string): Promise<MessageDto[] | undefined> => {
    try {
        await connectToDb()
        const messages = await User.find({chatId})
        return messages.map(message => message as MessageDto)
    } catch (error: any) {
        console.log(' Error in getMessages: ', error)
        // handleError(StatusCodes.INTERNAL_SERVER_ERROR, userMessages.displayAllUsersError, error)
    }
}

export const createMessage = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {chatId, userId, content} = Object.fromEntries(data)
    try {
        await connectToDb()
        const newMessage = new Message({chatId, senderId: userId, content})
        await newMessage.save()

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