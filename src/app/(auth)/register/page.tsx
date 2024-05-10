import React from 'react'
import styles from './register.module.css'
import UserForm from "@/components/users/user-form/UserForm";
import QuestionLink from "@/components/common/question-link/QuestionLink";
import { register } from "@/lib/api/auth/authActions";
import UserLoginForm from "@/components/users/user-login-form/UserLoginForm";

const RegisterPage = () => {
    return <div className={styles.container}>
        <QuestionLink question="Already have an account" path="/login" linkText="Login"/>
        <div className={styles.formContainer}>
            <UserForm action={register} redirectPath="/login"/>
        </div>
    </div>
}

export default RegisterPage
