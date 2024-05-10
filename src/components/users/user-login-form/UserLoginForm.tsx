'use client'

import React from 'react';
import styles from "./userLoginForm.module.css";
import { loginWithCredentials, loginWithGitHub } from "@/lib/api/auth/authActions";
import BaseForm from "@/components/forms/base-form/BaseForm";

const UserLoginForm = () => {
    return <div className={styles.container}>

        <BaseForm action={loginWithCredentials} buttonText="Login" redirectPath="/blog">
            <div className="input-row-wrapper">
                <label htmlFor="username">Username or Email</label>
                <input type="text" placeholder="Jane Doe / jd@google.com" id="username" name="username"/>
            </div>
            <div className="input-row-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Super Secret" id="password" name="password"/>
            </div>
        </BaseForm>

        <form action={loginWithGitHub}>
            <button type="submit">Login with GitHub</button>
        </form>
    </div>
}

export default UserLoginForm;