import React from 'react'
import styles from './contact.module.css'
import Image from "next/image";

const ContactPage = () => {
    return <div className={styles.container}>
        <div className={styles.imageContainer}>
            <Image src="/images/mtg-bolas.webp" alt="Nicol Bolas" className={styles.image} fill/>
        </div>
        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="text" placeholder="Phone Number (Optional)"/>
                <textarea name="" id="" cols={30} rows={10} placeholder="Your Message"></textarea>
                <button type="submit" className={styles.button}>Send</button>
            </form>
        </div>
    </div>
}

export default ContactPage
