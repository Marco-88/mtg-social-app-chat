import React, { ReactNode, useState } from 'react';
import styles from "./adminSideBar.module.css";

interface AdminSideBarProps {
    menuNames: string[]
    changeViewOnClick: (React.Sy)
    initialMenuName?: string
}

const AdminSideBar = (props: AdminSideBarProps) => {
    const [activeMenu, setActiveMenu] = useState(props.initialMenuName ?? props.menuNames[0])

    const changeMenu = name => {
        props.changeViewOnClick()
        setActiveMenu(name)
    }

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

    const MenuListItems = () => props.menuNames.map(name =>
        <li key={name}
            className={name === activeMenu ? 'active' : ''}
            onClick={() => changeMenu(name)}>{capitalize(name)}
        </li>
    )

    return <ul className={styles.container}>
        <MenuListItems/>
    </ul>
}

export default AdminSideBar;