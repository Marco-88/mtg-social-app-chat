import React, { ReactNode } from 'react'
import styles from './admin.module.css'
import AdminView from "@/components/admin/admin-view/AdminView";
import AdminPostView from "@/components/admin/admin-post-view/AdminPostView";
import AdminUserView from "@/components/admin/admin-user-view/AdminUserView";
import { ViewItem } from "@/lib/types/types";

// interface ViewItem {
//     name: string
//     component: ReactNode
// }

const AdminPage = () => {
    const views: {[key: string]: ReactNode} = {
        posts: <AdminPostView />,
        users: <AdminUserView />
    }

    return <div className={styles.container}>
        <AdminView initialKey="users" views={views}/>
    </div>
}

export default AdminPage
