import React, {useState} from 'react';
import Image from "next/image";
import styles from "./card.module.scss"
import {motion} from "framer-motion"
import cls from "classnames"

const Card = (props) => {
    const {imgUrl = "/static/clifford.jpg", size = "medium", id} = props;
    const [imgSrc, setImgSrc] = useState(imgUrl);

    const classMap = {
        "large": styles.lgItem,
        "medium": styles.mdItem,
        "small": styles.smItem,
    }

    const handleOnError = (error) => {
        setImgSrc('/static/clifford.jpg')
    }

    const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1}

    return <div className={styles.container}>
        <motion.div className={cls(styles.imgMotionWrapper, classMap[size])}
                    whileHover={scale}>
            <Image className={styles.cardImg} src={imgSrc} alt={"Cover of the movie"} // width={300} height={300}
                   layout={"fill"} onError={handleOnError}/>
        </motion.div>

    </div>
};

export default Card;
