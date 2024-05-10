import React from 'react'
import styles from "@/app/(auth)/login/login.module.css";
import UserLoginForm from "@/components/users/user-login-form/UserLoginForm";
import QuestionLink from "@/components/common/question-link/QuestionLink";

const LoginPage = () => {
    return <div className={styles.container}>
        <QuestionLink question="No account yet" path="/register" linkText="Register"/>
        <div className={styles.formContainer}>
            <UserLoginForm />
        </div>
    </div>
}

export default LoginPage
