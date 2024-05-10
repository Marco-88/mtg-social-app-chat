import React, { Suspense } from 'react'
import styles from './blog.module.css'
import PostForm from "@/components/posts/post-form/PostForm";
import PostCardList from "@/components/posts/post-card-list/PostCardList";
import Spinner from "@/components/common/spinner/Spinner";

const BlogPage = () => {
    return <div className={styles.container}>
        <div className={styles.formContainer}>
            <PostForm />
        </div>
        <div className={styles.listContainer}>
            <Suspense fallback={<Spinner />} >
                <PostCardList />
            </Suspense>
        </div>
    </div>
}

export default BlogPage
