import React from 'react';
import TextItem from "@/components/common/text-item/TextItem";
import { getUser } from "@/lib/api/users/userActions";
import styles from './postUser.module.css'
import UserImage from "@/components/users/user-image/UserImage";
import { UserDto } from "@/lib/api/users/userDto";

const PostUser = async ({userId}: {userId: string}) =>{
    const user: UserDto = await getUser(userId)

    return <div className={styles.container}>
        {user.image && <UserImage image={user.image}/>}
        <TextItem title="Author" text={user.username}/>
    </div>
};

export default PostUser;