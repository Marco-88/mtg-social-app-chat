import React from 'react'
import styles from './postCard.module.css'
import Link from "next/link";
import Image from "next/image";
import { PostDto } from "@/lib/api/posts/postDto";

interface Props {
    post: PostDto
}

const PostCard = ({ post }: Props) => {
    return <div className={styles.container}>
        <div className={styles.top}>
            <div className={styles.imageContainer}>
                {post.image
                    ? <Image src={post.image} alt={post.title} className={styles.image} fill/>
                    : <div>No Image Available!</div>}
            </div>
            <span className={styles.date}>{post.createdAt.toString().slice(4, 24)}</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>
            <Link href={`/blog/${post.slug}`} className={styles.link}>
                Read More
            </Link>
        </div>
    </div>
}

export default PostCard
