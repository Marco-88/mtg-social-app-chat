import React from 'react';
import Link from "next/link";
import styles from './questionLink.module.css'

interface Props {
    question: string
    path: string
    linkText: string
}

const QuestionLink = ({question, path, linkText}: Props) =>{
    return <div className={styles.container}>
        <p className={styles.question}>
            {question}?
            <span className={styles.link}><Link href={path}> {linkText}</Link></span>
        </p>
    </div>
}

export default QuestionLink;