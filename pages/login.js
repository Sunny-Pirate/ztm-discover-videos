import React, {useState} from 'react';
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import {router} from "next/client";

const LoginPage = () => {
    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");
    const handleOnChangeEmail = (err) => {
        console.log("event", err)
        const e = err.target.value;
        setEmail(e)
    };
    const handleLoginWithEmail = (e) => {
        console.log('Hi button')
        e.preventDefault();

        if (email) {
            if (email === 'luca@sunnyday.software') {
                router.push("/")
            } else {
                setUserMsg('Something went wrong logging in.')
            }
        } else {
            setUserMsg('Enter a valid email address')
        }
    }

    return <div className={styles.container}>
        <Head>
            <title>Netflix SignIn</title>
        </Head>
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <a className={styles.logoLink} href={'/'}>
                    <div className={styles.logoWrapper}>
                        <Image src={'/static/netflix.svg'} alt={"Netflix logo"} width={128} height={34}/>
                    </div>
                </a>
            </div>
        </header>
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>

                <input
                    type={"text"}
                    placeholder={"Email address"}
                    className={styles.emailInput}
                    onChange={handleOnChangeEmail}
                />

                <p className={styles.userMsg}>{userMsg}</p>

                <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
                    Sign In
                </button>
            </div>
        </main>
    </div>
};

export default LoginPage;
