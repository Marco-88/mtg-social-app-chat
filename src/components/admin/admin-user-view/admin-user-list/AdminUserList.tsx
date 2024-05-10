import React from 'react'
import styles from './adminUserList.module.css'
import { UserDto } from "@/lib/api/users/userDto";
import { getUsers } from "@/lib/api/users/userActions";
import AdminUserItem from "@/components/admin/admin-user-view/admin-user-item/AdminUserItem";

const AdminUserList = async () => {
    const users: UserDto[] = (await getUsers()) as UserDto[]

    return <div className={styles.container}>
        {users?.map(user => <AdminUserItem key={user.id} user={user} />)}
    </div>
}

export default AdminUserList
