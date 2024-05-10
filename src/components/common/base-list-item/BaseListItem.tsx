'use client'

import React, { ReactNode } from 'react';
import styles from "./baseListItem.module.css";
import { UserDto } from "@/lib/api/users/userDto";
import UserImage from "@/components/users/user-image/UserImage";
import FormActionIcon from "@/components/forms/form-action-icon/FormActionIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormActionConfig } from "@/lib/types/types";

interface Props {
    children: ReactNode
    image?: string
    icons: ReactNode
}

const BaseListItem = ({children, image, icons}: Props) => {
    return <li className={styles.container}>
        <div className={styles.imageContainer}>
            <UserImage image={image}/>
        </div>
        <div className={styles.details}>
            {children}
        </div>
        <div className={styles.icons}>
            {icons}
        </div>
    </li>
}

export default BaseListItem;