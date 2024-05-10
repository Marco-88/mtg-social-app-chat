'use client'

import React, { ReactNode, useState } from 'react'
import styles from './adminView.module.css'
import { CollectionName } from "@/lib/types/types";

interface Props {
    initialKey: CollectionName
    views: { [key: string]: ReactNode }
}

const AdminView = ({initialKey, views}: Props) => {
    const [currentKey, setCurrentKey] = useState(initialKey)
    const menuNames: CollectionName[] = Object.keys(views) as CollectionName[]

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
    const Sidebar = () => menuNames.map(key =>
        <li key={key}
            className={key === currentKey ? styles.activeAdminLink : styles.adminLink}
            onClick={() => setCurrentKey(key)}>{capitalize(key)}
        </li>
    )

    return <div className={styles.container}>
        <ul className={styles.sidebar}>
            <Sidebar />
        </ul>

        <div className={styles.view}>
            {views[currentKey]}
        </div>
    </div>
}

export default AdminView

