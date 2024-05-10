'use client'

import React from 'react'
import Link from "next/link"
import styles from './navLink.module.css'
import { NavbarLink } from "@/components/layout/navbar/links/Links"
import { usePathname } from "next/navigation"

const NavLink = ({title, path}: NavbarLink) => {
    const pathName = usePathname()

    return <Link className={`${styles.link} ${pathName === path ? styles.active : ""}`} href={path}>
        {title}
    </Link>
}

export default NavLink
