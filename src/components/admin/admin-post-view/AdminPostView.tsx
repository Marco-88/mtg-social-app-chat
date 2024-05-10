import React, { Suspense } from 'react';
import styles from "./adminPostView.module.css";
import PostForm from "@/components/posts/post-form/PostForm";
import AdminPostList from "@/components/admin/admin-post-view/admin-post-list/AdminPostList";
import Spinner from "@/components/common/spinner/Spinner";
import { auth } from "@/lib/api/auth/auth";

const AdminPostView = async () => {
    return <div className={styles.container} >
        <PostForm />
        <Suspense fallback={<Spinner />}>
            <AdminPostList />
        </Suspense>
    </div>
}

export default AdminPostView;