import React, {useEffect, useState} from 'react';
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import magic from "../lib/magic-client";
import {useRouter} from "next/router";
// import {magic} from "../lib/magic-client";

const LoginPage = () => {
    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
        return () => {
            router.events.off('routeChangeComplete', handleComplete)
            router.events.on('routeChangeError', handleComplete)
        };
    }, [router]);


    const handleOnChangeEmail = (value) => {
        // console.log("input value changed in ->", value)
        const e = value.target.value;
        setEmail(e)
    };
    const handleLoginWithEmail = async (e) => {
        console.log('Hi button')
        e.preventDefault();
        if (email) {
            setIsLoading(true)
            if (email === 'luca@sunnyday.software') {
                // log in a user by their email
                try {
                    const didToken = await magic.auth.loginWithMagicLink({
                        email: email
                    });
                    console.log('didToken', didToken)
                    if (didToken) {
                        await router.push('/')
                    }
                } catch (error) {
                    // Handle errors if required!
                    console.log('Something went wrong logging in', error)
                    setIsLoading(false)
                }
                // router.push("/")
            } else {
                setIsLoading(false)
                setUserMsg('Something went wrong logging in.')
            }
        } else {
            setIsLoading(false)
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
                    {isLoading ? "Loading..." : "Sign In"}
                </button>
            </div>
        </main>
    </div>
};

export default LoginPage;
