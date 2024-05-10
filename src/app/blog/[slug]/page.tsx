import React, { Suspense } from 'react'
import styles from "./singlePost.module.css";
import Image from "next/image";
import TextItem from "@/components/common/text-item/TextItem";
import PostUser from "@/components/posts/post-user/PostUser";
import { getPost } from "@/lib/api/posts/postActions";
import { PostDto } from "@/lib/api/posts/postDto";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FormActionIcon from "@/components/forms/form-action-icon/FormActionIcon";
import Spinner from "@/components/common/spinner/Spinner";
import { FormActionConfig } from "@/lib/types/types";

const SinglePostPage = async ({params}: { params: { slug: string } }) => {
    const post: PostDto = await getPost(params.slug)

    const formActionConfig: FormActionConfig = {
        collection: 'posts',
        action: 'delete'
    }

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
            <FormActionIcon icon={faTrash} config={formActionConfig} inputName="slug"  tooltip="Delete Post"/>
        </div>
    </div>
}

export default SinglePostPage
