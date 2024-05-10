'use client'

import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from './chatPanel.module.css'
import { io } from 'socket.io-client'

interface ChatProps {
    userId: string
    chatName: string
    chatMessages?: ChatMessage[]
}

interface ChatMessage {
    id: string
    content: string
    transmitterId: string
    recipientId: string
    createdAt: string
}

const ChatPanel = ({userId, chatName, chatMessages = []}: ChatProps) => {
    const [messages, setMessages] = useState(chatMessages)
    const [message, setMessage] = useState('')

    const ChatMessages = () => chatMessages.map(message =>
        <li key={message.id}
            className={message.transmitterId === userId ? styles.messageOut : styles.messageIn}>
            <span className={styles.messageDate}>{message.createdAt}</span>
            <p className={styles.messageContent}>{message.content}</p>
        </li>
    )

    const socket = io('http://192.168.178.49:4017')

    useEffect(() => {
        socket.on('connection', (data) => {
            console.log('*** Connection: ', data)
        })

        socket.on('response', (data) => {
            console.log('*** Response Data: ', data)
            messages.push(data as ChatMessage)
        })

        socket.on('disconnect', (data) => {
            console.log('*** Disconnect: ', data)
        })

        return () => {
            socket.disconnect()
        }
    }, [socket]);

    const sendMessage = (event:  React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            socket.emit('send', message)
            setMessage('')
        }
    }

    return <div className={styles.container}>
        <div className={styles.chatHeader}>
            {chatName}
        </div>
        <ul className={styles.chatMessageList}>
            <ChatMessages />
        </ul>
        <div className={styles.chatInputContainer + 'input-row-wrapper'}>
            <label hidden htmlFor="message"></label>
            <input type="text" placeholder="Your Message..." id="message" name="message" autoComplete="message"
                   value={message} onChange={(event) => setMessage(event.currentTarget.value)} required onKeyDown={sendMessage}/>
        </div>
    </div>
}

export default ChatPanel
