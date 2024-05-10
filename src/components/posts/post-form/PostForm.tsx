'use client'

import React, { useState } from 'react'
import { createPost, updatePost } from "@/lib/api/posts/postActions";
import BaseForm from "@/components/forms/base-form/BaseForm";
import { PostDto } from "@/lib/api/posts/postDto";

interface PostFormProps {
    redirectPath?: string
    post?: PostDto
}

export const PostForm = ({redirectPath, post}: PostFormProps) => {
    const [slug, setSlug] = useState(post?.slug  || '')

    const parseSlug = (title: string) => title.toLowerCase().replaceAll(' ', '-')
    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSlug(() => parseSlug(event.currentTarget.value))

    return <BaseForm action={post ? updatePost : createPost} buttonText="Create" redirectPath={redirectPath}>
        {post && <div>Edit Post</div>}
        <div className="input-row-wrapper">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Your Headline" id="title" name="title"
                   onChange={onChangeTitle} defaultValue={post?.title} required/>
        </div>
        <div className="input-row-wrapper">
            <label htmlFor="description">Description</label>
            <textarea placeholder="Your story" id="description" name="description" defaultValue={post?.description} required/>
        </div>
        {!post && <div className="input-row-wrapper">
            <label htmlFor="image">Image</label>
            <input type="file" placeholder="Profile Picture" id="image" name="image"/>
        </div>}
        <input hidden name="slug" defaultValue={post ? post.slug : slug}/>
    </BaseForm>
}

export default PostForm;
