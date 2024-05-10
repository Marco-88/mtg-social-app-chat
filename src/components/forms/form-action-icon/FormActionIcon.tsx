'use client'

import React from 'react';
import { useFormState } from "react-dom";
import { AppFormState, FormAction, FormActionConfig } from "@/lib/types/types";
import { createPost, deletePost } from '@/lib/api/posts/postActions';
import { createUser, deleteUser } from "@/lib/api/users/userActions";
import styles from "./formActionIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import ActionIcon from "@/components/common/action-icon/ActionIcon";

interface Props {
    icon: IconDefinition
    config: FormActionConfig
    inputName: string
    tooltip: string
    color?: 'primary' | 'secondary'
    size?: SizeProp
}

const collectionActionMap: {[key: string]: {[name: string]: FormAction}} = {
    posts: {
        create: createPost,
        delete: deletePost
    },
    users: {
        create: createUser,
        delete: deleteUser
    }
}

const FormActionIcon = ({ icon, config, inputName, tooltip, color = 'secondary', size = '2xl'}: Props) => {
    const action = collectionActionMap[config.collection][config.action]
    const [state, formAction] = useFormState(action, {} as AppFormState)

    return <form action={formAction} className={styles.container}>
        <input hidden type="text" name={inputName}/>
        <button type="submit" className={styles.iconButton} title={tooltip}>
            <ActionIcon icon={icon} tooltip={tooltip} size={size} color={color}/>
        </button>
            {/*<button type="submit" className={styles.iconButton} title={tooltip}>*/}
            {/*    <div className={styles.iconWrapper}>*/}
            {/*        <FontAwesomeIcon icon={icon} size="xl" className={`${styles.icon} ${color}`}/>*/}
            {/*    </div>*/}
            {/*</button>*/}
            <div className="form-state-info">
                {state?.error}
            </div>
    </form>
}

export default FormActionIcon;