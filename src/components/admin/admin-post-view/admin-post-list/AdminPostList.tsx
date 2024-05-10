import React from 'react'
import styles from './adminPostList.module.css'
import { PostDto } from "@/lib/api/posts/postDto";
import AdminPostItem from "@/components/admin/admin-post-view/admin-post-item/AdminPostItem";
import { getPosts } from '@/lib/api/posts/postActions';

const AdminPostList = async () => {
    const posts: PostDto[] = await getPosts() as any[]

    return <div className={styles.container}>
        {posts.map(post => <AdminPostItem key={post.id} post={post}/>)}
    </div>
}

export default AdminPostList
