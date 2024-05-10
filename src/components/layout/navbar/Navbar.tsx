import React from 'react'
import Links from "@/components/layout/navbar/links/Links"
import styles from './navbar.module.css'
import Link from "next/link";
import { auth } from "@/lib/api/auth/auth";

const Navbar = async () => {
    const session = await auth()

    return <nav className={styles.container}>
        <Link href="/public" className={styles.logo}>
            Logo
        </Link>
        <Links session={session}/>
    </nav>
}

export default Navbar