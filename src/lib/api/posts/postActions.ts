'use server'

import { connectToDb } from "@/lib/mongo";
import { Post } from "@/lib/api/posts/postSchema";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/errorHandler";
import { StatusCodes } from "http-status-codes";
import { postMessages } from "@/lib/api/posts/postMessages";
import { AppFormState } from "@/lib/types/types";
import { auth } from "@/lib/api/auth/auth";

export const getPosts = async () => {
    try {
        await connectToDb()
        return await Post.find()
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, postMessages.displayAllPostsError, error)
    }
}

export const getPost = async (slug: string) => {
    try {
        await connectToDb()
        return await Post.findOne({slug})
    } catch (error: any) {
        handleError(StatusCodes.INTERNAL_SERVER_ERROR, postMessages.displayPostError(slug), error)
    }
}

export const createPost = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {title, description, slug} = Object.fromEntries(data)

    try {
        await connectToDb()
        const session = await auth()
        const newPost = new Post({title, description, slug, userId: session?.user?.id})
        await newPost.save()

        revalidatePath('/blog')
        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: postMessages.createPostError }
    }
}

export const updatePost = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {title, description, slug} = Object.fromEntries(data)
    try {
        await connectToDb()
        await Post.findOneAndUpdate({slug}, {title, description})

        revalidatePath('/blog')
        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: postMessages.createPostError }
    }
}

export const deletePost = async (previousState: Awaited<AppFormState>, data: FormData) => {
    const {slug} = Object.fromEntries(data)
    try {
        await connectToDb()
        await Post.findOneAndDelete({slug})

        revalidatePath('/blog')
        revalidatePath('/admin')
        return { success: true }
    } catch (error: any) {
        return { error: postMessages.deletePostError(slug as string) }
    }
}