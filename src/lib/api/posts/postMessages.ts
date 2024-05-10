import { wentWrong } from "@/lib/api/appMessages";

export const postMessages = {
    createPostError: wentWrong + ' on creating a new admin-post-view',
    deletePostError: (slug: string) => `${wentWrong} on deleting post (${slug})}`,
    displayPostError: (slug: string) => `${wentWrong} on displaying post (${slug})}`,
    displayAllPostsError: wentWrong + ' on displaying posts'
}