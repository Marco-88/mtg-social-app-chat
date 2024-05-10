import React from 'react'
import Spinner from "@/components/common/spinner/Spinner";
import styles from './loading.module.css';

const Loading = () => {
    return <div className={styles.container}>
        <Spinner />
    </div>
}

export default Loading
