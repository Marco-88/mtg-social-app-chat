import styles from "./textItem.module.css";
import React from "react";

interface Props {
    title: string
    text: string
}

const TextItem = ({ title, text }: Props) => {
    return <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
    </div>
}

export default TextItem