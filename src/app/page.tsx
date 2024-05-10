import React from 'react'
import styles from './home.module.css'
import Image from "next/image";

const Home = () => {
    return <div className={styles.container}>
        <div className={styles.textContainer}>
            <h1>Mighty Magicians</h1>

            <p>Fighting through the blind eternities until the planes
                collide and nothing but pure void will be leftover</p>

            <div className={styles.buttons}>
                <button className={styles.button} type="button">Learn More</button>
                <button className={styles.button} type="button">Contact</button>
            </div>

            <div className={styles.beyondImageWrapper}>
                <Image src="/images/mtg-universes-beyond-logo.webp"
                       alt="Universes Beyond Logo"
                       fill
                       sizes="100%"
                       className={styles.beyondImage}/>
            </div>
        </div>
        <div className={styles.imageContainer}>
            <Image src="/images/mtg-animated-eternity.gif"
                   alt="God of forge in the blind eternities"
                   width={500}
                   height={349}
                   sizes="100%"
                   className={styles.eternityImage}/>
        </div>
    </div>
}

export default Home
