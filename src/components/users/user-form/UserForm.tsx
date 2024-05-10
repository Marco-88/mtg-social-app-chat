'use client'

import React from 'react'
import styles from './userForm.module.css'
import { FormAction } from "@/lib/types/types"
import BaseForm from "@/components/forms/base-form/BaseForm"
import { UserDto } from "@/lib/api/users/userDto";

interface UserFormProps {
    action: FormAction
    buttonText?: string
    redirectPath?: string
    user?: UserDto
}

const UserForm = ({action, buttonText = "Register", redirectPath = "/login", user}: UserFormProps) => {
    return <div className={styles.container}>
        {user && <div>Edit User</div>}
        <BaseForm action={action} buttonText={buttonText} redirectPath={redirectPath}>
            <div className="input-row-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Jane Doe" id="username" name="username" autoComplete="username" defaultValue={user?.username} required/>
            </div>
            <div className="input-row-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="jd@google.com" id="email" name="email" defaultValue={user?.email} autoComplete="email" required/>
            </div>
            {!user && <div className="input-row-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Super Secret" id="password" name="password"
                       autoComplete="current-password" required/>
            </div>}
            {!user && <div className="input-row-wrapper">
                <label htmlFor="image">Image</label>
                <input type="file" placeholder="Profile Picture" id="image" name="image"/>
            </div>}
        </BaseForm>
    </div>
}

export default UserForm;