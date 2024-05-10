'use client'

import React, { useState } from 'react';
import styles from "./adminPostItem.module.css";
import { PostDto } from "@/lib/api/posts/postDto";
import FormActionIcon from "@/components/forms/form-action-icon/FormActionIcon";
import { faClose, faEdit, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FormActionConfig } from "@/lib/types/types";
import BaseListItem from "@/components/common/base-list-item/BaseListItem";
import ActionIcon from "@/components/common/action-icon/ActionIcon";
import PostForm from "@/components/posts/post-form/PostForm";

interface Props {
    post: PostDto
}

const AdminPostItem = ({post}: Props) =>{
    const [isEditing, setIsEditing] = useState(false)

    const formActionConfig: FormActionConfig = {
        collection: 'posts',
        action: 'delete'
    }

    const Icons = <div className={styles.icons}>
        <ActionIcon icon={!isEditing ? faEdit : faClose} size="xl" action={()=>setIsEditing(prev=>!prev)}
                    tooltip={!isEditing ? "Edit Post" : "Cancel"}/>
        {!isEditing &&
            <FormActionIcon icon={faTrash} config={formActionConfig} size="xl" inputName="slug" tooltip="Delete Post"/>}
    </div>

    return <BaseListItem icons={Icons} image={post.image}>
        {!isEditing ? <div className={styles.details}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.date}>{post.createdAt.toString().slice(4, 24)}</div>
            <div className={styles.description}>{post.description.substring(0, Math.min(50, post.description.length))}</div>
        </div> : <PostForm post={post}/>}
    </BaseListItem>
}

export default AdminPostItem;