import React, {useState} from 'react';
import styles from "./navbar.module.scss";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

const NavBar = (props) => {
    const {username} = props;
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const handleOnClickHome = (event) => {
        event.preventDefault()
        router.push('/')
        console.log('handleOnClickHome: ', {handleOnClickHome});

    };

    const handleOnClickMylist = (event) => {
        event.preventDefault()
        router.push('/browse/my-list')
        console.log('handleOnClickMylist: ', {handleOnClickMylist});

    }


    const handleShowDropdown = (event) => {
        event.preventDefault();
        setShowDropdown(!showDropdown)
        console.log('handleShowDropdown: ', {handleShowDropdown});

    }

    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href={'/'}>
                <div className={styles.logoWrapper}>
                    <Image src={'/static/netflix.svg'} alt={"Netflix logo"} width={128} height={34}/>
                </div>
            </a>
            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                <li className={styles.navItem2} onClick={handleOnClickMylist}>My List</li>
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                        <p className={styles.username}>
                            {username}
                        </p>
                        {/*    Expand more icon*/}
                        <Image src={'/static/expand_more.svg'} alt={"Expand dropdown"} width={24} height={24}/>
                    </button>
                    {showDropdown && (
                        <div className={styles.navDropdown}>
                            <div>
                                <Link href={"/login"}>
                                    <a className={styles.linkName}>
                                        Sign out
                                    </a>
                                </Link>
                                <div className={styles.lineWrapper}></div>
                            </div>
                        </div>
                    )}

                </div>
            </nav>
        </div>
    </div>
};

export default NavBar;
