'use client'

import React from 'react'
import Link from "next/link"
import styles from './nav-link.module.css'
import { NavbarLink } from "@/components/navbar/links/Links"
import { usePathname } from "next/navigation"

const NavLink = ({title, path}: NavbarLink) => {
    const pathName = usePathname()

    return <Link className={`${styles.link} ${pathName === path ? styles.active : ""}`} href={path}>
        {title}
    </Link>
}

export default NavLink
