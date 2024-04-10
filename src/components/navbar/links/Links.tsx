import React from 'react'
import Link from "next/link";
import styles from './links.module.css'
import NavLink from "@/components/navbar/links/nav-link/NavLink";

export interface NavbarLink {
    title: string
    path: string
}

const Links = () => {

    const links: NavbarLink[] = [
        {title: 'Home', path: '/'},
        {title: 'Ablout', path: '/about'},
        {title: 'Contact', path: '/contact'},
        {title: 'Blog', path: '/blog'},
    ]

    const session = true
    const isAdmin = true

    return <div className={styles.links}>
        {links.map(link =>
            <NavLink key={link.title} title={link.title} path={link.path} />
        )}
        {session ? (<>
            {isAdmin && <NavLink title="Admin" path="/admin" />}
            <button>Logout</button>
        </>) : (<NavLink title="Login" path="/login" />)}
    </div>
}

export default Links
