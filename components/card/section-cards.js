import React from 'react';
import Card from "./card";
import styles from "./section-cards.module.scss"
import Link from "next/link";

const SectionCards = (props) => {
    const {title, videos = [], size} = props;
    return <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
            {videos.map((video, index) => {
                return <Link href={`/video/${video.id}`} key={`video-${index}`}>
                    <a>
                        <Card key={index} id={index} imgUrl={video.imgUrl} size={size}/>
                    </a>
                </Link>
            })}
        </div>
    </section>
};

export default SectionCards;
