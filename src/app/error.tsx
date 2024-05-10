'use client'

import React from 'react'
import styles from './error.module.css'
import { parseErrorMessage } from "@/lib/errorHandler";

type ErrorProps = {
    error: Error;
    reset: () => void;
};

const Error = ({error, reset}: ErrorProps) =>{
    const data = parseErrorMessage(error.message)
    const Details = () => data.details && <div className={styles.details}>{data.details}</div>

    return <div className={styles.container}>
        <div className={styles.statusCode}>{data.status}</div>
        <div className={styles.info}>{data.info}</div>
        <Details />
    </div>
}

export default Error
