import React, {useState} from 'react';
import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from "../../styles/VideoPage.module.css";
import cls from 'classnames';
import {getYoutubeVideoById} from "../../lib/videos";
import NavBar from "../../components/nav/navbar";
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


Modal.setAppElement('#__next');

export async function getStaticProps(context) {

    const videoId = context.params.videoId
    const videoArray = await getYoutubeVideoById(videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10,
    };
}

export const getStaticPaths = async (ctx) => {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoId) => ({
        params: {videoId},
    }))

    return {paths, fallback: 'blocking'}
};

const VideoPage = ({video}) => {
        const router = useRouter();
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const videoId = router.query.videoId

        const {
            title, publishTime, description, channelTitle,
            statistics: {viewCount} = {viewCount: 0}
        } = video;


        return <div className={styles.container}>
            <NavBar />
            <Modal isOpen={true}
                   contentLabel={"Video element"}
                   onRequestClose={(event) => {
                       event.preventDefault();
                       router.back();
                   }}
                   shouldCloseOnEsc={true}
                   shouldCloseOnOverlayClick={true}
                   className={styles.modal}
                   overlayClassName={styles.overlay}
            >
                <iframe
                    id="yplayer"
                    className={styles.videoPlayer}
                    type="text/html"
                    width="100%"
                    height="360"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://localhost&controls=0&rel=1`}
                    frameBorder="0"
                ></iframe>

                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.description}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    }
;

export default VideoPage;
