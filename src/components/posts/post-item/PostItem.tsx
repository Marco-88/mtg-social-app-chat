import React, { ReactNode, Suspense } from 'react'
import styles from "./postItem.module.css";
import Image from "next/image";
import TextItem from "@/components/common/text-item/TextItem";
import PostUser from "@/components/posts/post-user/PostUser";
import { getPost } from "@/lib/api/posts/postActions";
import { PostDto } from "@/lib/api/posts/postDto";
import Spinner from "@/components/common/spinner/Spinner";

interface Props {
    slug: string
    children?: ReactNode
}

const PostItem = async ({slug, children}: Props) => {

    const post: PostDto = await getPost(slug)

    return <div className={styles.container}>
        {post.image && <div className={styles.imageContainer}>
            <Image src={post.image} alt={post.title} className={styles.image} fill/>
        </div>}

        <div className={styles.textContainer}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.details}>
                <Suspense fallback={<Spinner />}>
                    <PostUser userId={post.userId}/>
                </Suspense>
                <TextItem title="Published" text={post.createdAt.toString().slice(4, 24)} />
            </div>
            <p className={styles.description}>{post.description}</p>
            {children}
        </div>
    </div>
}

export default PostItem
