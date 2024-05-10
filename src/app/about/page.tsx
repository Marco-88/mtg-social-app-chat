import React from 'react'
import Image from 'next/image'
import styles from './about.module.css'

const AboutPage = () => {
    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <Image
                src="/images/mtg-arena-liliana.png"
                alt="MTG Arena"
                fill
                className={styles.lilianaImage}
            />
        </div>
        <p>All about magic... building decks, beating brews, beat top tier decks with own brews,
            kitchen table shenanigans and so on</p>
    </div>

}

export default AboutPage
