'use client'

import React, { useState } from 'react';
import styles from "./adminUserItem.module.css";
import { UserDto } from "@/lib/api/users/userDto";
import UserImage from "@/components/users/user-image/UserImage";
import FormActionIcon from "@/components/forms/form-action-icon/FormActionIcon";
import { faClose, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FormActionConfig } from "@/lib/types/types";
import ActionIcon from "@/components/common/action-icon/ActionIcon";
import UserForm from "@/components/users/user-form/UserForm";
import { updateUser } from "@/lib/api/users/userActions";
import BaseListItem from "@/components/common/base-list-item/BaseListItem";

interface Props {
    user: UserDto
}

const AdminUserItem = ({user}: Props) =>{
    const [isEditing, setIsEditing] = useState(false)

    const deleteActionConfig: FormActionConfig = {
        collection: 'users',
        action: 'delete'
    }

    const Icons = <div className={styles.icons}>
        <ActionIcon icon={!isEditing ? faUserEdit : faClose} size="xl" action={()=>setIsEditing(prev=>!prev)}
                    tooltip={!isEditing ? "Edit User" : "Cancel"}/>
        {!isEditing &&
            <FormActionIcon icon={faTrash} config={deleteActionConfig} size="xl" inputName="id" tooltip="Delete User"/>}
    </div>

    return <BaseListItem icons={Icons} image={user.image}>
        {!isEditing ? <div className={styles.details}>
            <p className={styles.username}>{user.username}</p>
            <p className={styles.title}>{user.email}</p>
            <p className={styles.date}>{user.createdAt.toString().slice(4, 24)}</p>
            <p className={styles.description}>{user.isAdmin}</p>
        </div> : <UserForm action={updateUser} user={user}/>}
    </BaseListItem>
}

export default AdminUserItem;