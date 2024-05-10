import React, { Suspense } from 'react';
import styles from "./adminUserView.module.css";
import AdminUserList from "@/components/admin/admin-user-view/admin-user-list/AdminUserList";
import Spinner from "@/components/common/spinner/Spinner";
import UserForm from "@/components/users/user-form/UserForm";
import { register } from "@/lib/api/auth/authActions";

const AdminUserView = () => {
    return <div className={styles.container} >
        <UserForm action={register}/>
        <Suspense fallback={<Spinner />}>
            <AdminUserList />
        </Suspense>
    </div>
}

export default AdminUserView;