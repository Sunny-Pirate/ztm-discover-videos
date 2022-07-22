import React, {useEffect, useState} from 'react';
import styles from "./navbar.module.scss";
import {useRouter} from "next/router";
import Image from "next/image";
import magic from "../../lib/magic-client";

const NavBar = (props) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState('Log in');
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

    const handleSignOut = async (event) => {
        event.preventDefault()
        try {
            await magic.user.logout();
            console.log('user is logged? ', await magic.user.isLoggedIn())
            router.push('/login')
        } catch (error) {
            console.log('Error logging out', error);
            router.push('/login')
        }
    }

    useEffect(() => {

        async function getUsername() {
            try {
                const {email} = await magic.user.getMetadata();

                if (email) {
                    console.log(email)
                    setUsername(email)
                }
            } catch (error) {
                console.log('Error retrieving email', error)
            }
        }

        getUsername()
    }, []);

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
                                <a className={styles.linkName} onClick={handleSignOut}>
                                    Sign out
                                </a>
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
