import React from 'react'
import styles from './chat.module.css'
import { auth } from "@/lib/api/auth/auth";
import ChatPanel from "@/components/chat/ChatPanel";

const Chat = async () => {
    const session = await auth()

    return <div className={styles.container}>
        <ChatPanel chatName="First ChatPanel" userId={session?.user?.id!}/>
    </div>
}

export default Chat
