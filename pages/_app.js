import '../styles/globals.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import magic from "../lib/magic-client";
import Loading from "../components/loading/loading";

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // async function verifyUserLogged() {
        //     const isLoggedIn = await magic.user.isLoggedIn();
        //     if (isLoggedIn) {
        //         setIsLoading(false)
        //         router.push("/")
        //     } else {
        //         setIsLoading(false)
        //         router.push("/login")
        //     }
        // }
        //
        // verifyUserLogged()
    }, [router]);


    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false);
        };
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
        handleComplete();

        return () => {
            router.events.off("routeChangeComplete", handleComplete);

            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);
    return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
