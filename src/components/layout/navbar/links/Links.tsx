'use client'

import React, { useState } from 'react'
import styles from './links.module.css'
import NavLink from "@/components/layout/navbar/nav-link/NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Session } from "next-auth";
import { signOut } from "next-auth/react"
import ActionIcon from "@/components/common/action-icon/ActionIcon";


export interface NavbarLink {
    title: string
    path: string
}

interface Props {
    session: Session | null
}

const Links = ({session}: Props) =>{
    const [open, setOpen] = useState(false)

    const links: NavbarLink[] = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
        { title: 'Chat', path: '/chat' },
        { title: 'Blog', path: '/blog' },
    ]

    const MainLinks = () => {
        return links.map(link=>
            <NavLink key={link.title} title={link.title} path={link.path}/>
        )
    }

    const AuthLinks = () => {
        if(session) {
            return <>
                <AdminLink/>
                <div className={styles.logout} onClick={() => signOut()}>
                    <ActionIcon icon={faSignOut} size="xl" tooltip="Logout" />
                </div>
            </>
        }

        return <NavLink title="Login" path="/login"/>
    }

    const AdminLink = () => {
        if(session?.user) {
            return <NavLink title="Admin" path="/admin"/>
        }
    }

    const MobileLinks = () => {
        if(open) {
            return <div className={styles.mobileLinks}>
                <MainLinks/>
            </div>
        }
    }

    return <div className={styles.container}>
        <div className={styles.links}>
            <MainLinks />
            <AuthLinks />
        </div>
        <div className={styles.menuButton}>
            <FontAwesomeIcon icon={faBars} size="xl" className={styles.menuButton} onClick={()=>setOpen(prev=>!prev)}/>
        </div>
        <MobileLinks />
    </div>
}

export default Links
