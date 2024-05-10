import React from "react";
import { PostDto } from "@/lib/api/posts/postDto";
import { getPosts } from "@/lib/api/posts/postActions";
import styles from "@/app/blog/blog.module.css";
import PostCard from "@/components/posts/post-card/PostCard";

const PostCardList = async () => {
    const posts: PostDto[] = await getPosts() as any[]

    const PostCards = () => {
        return posts.map(post=> <div key={post.id} className={styles.post}>
                <PostCard post={post}/>
            </div>
        )
    }

    return <div className={styles.listContainer}>
        <PostCards />
    </div>
}

export default PostCardList