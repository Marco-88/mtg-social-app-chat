'use client'

import React from 'react';
import { CldImage } from "next-cloudinary";
import styles from "@/components/posts/post-user/postUser.module.css";
import Image from "next/image";

interface Props {
    image?: string
    size?: number
}

const UserImage = ({image, size = 70}: Props) => {
    const imageUrl = image ?? "/images/mtg-ashiok-no-pic.webp"

    return image?.includes('cloudinary') ?
        <CldImage src={imageUrl} alt="User" className={styles.avatar} width={size} height={size}/> :
        <Image src={imageUrl} alt="User" className={styles.avatar} width={size} height={size}/>
}

export default UserImage;