import React from 'react'
import styles from './spinner.module.css'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    size?: SizeProp
}

const Spinner = async ({size = '3x'}: Props) => {
    return <div className={styles.container}>
        <FontAwesomeIcon icon={faSpinner} size={size} className={styles.spinner}/>
    </div>
}

export default Spinner