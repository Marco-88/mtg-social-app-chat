'use client'

import React, { ReactNode, useEffect } from 'react';
import { useFormState } from "react-dom";
import styles from "./baseForm.module.css";
import { useRouter } from "next/navigation";
import { AppFormState, FormAction } from "@/lib/types/types";

interface UserFormProps {
    children: ReactNode
    action: FormAction
    buttonText: string
    redirectPath?: string
}

const BaseForm = ({children, action, buttonText, redirectPath}: UserFormProps) => {
    const [state, formAction] = useFormState(action, {} as AppFormState)
    const router = useRouter()

    useEffect(() => {
        redirectPath && state?.success && router.push(redirectPath)
    }, [state, router])

    return <form className={styles.container} action={formAction}>
        {children}
        <button type="submit">{buttonText}</button>
        <div className="form-state-info">
            {state?.error}
        </div>
    </form>
}

export default BaseForm;