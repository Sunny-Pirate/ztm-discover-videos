import {Magic} from 'magic-sdk';
// import {config} from "./config";

const createMagic = () => {

    const magicApiKey = process.env.NEXT_PUBLIC_MAGIC_API_KEY;
    console.log('Magic key', magicApiKey)
    return (
        typeof window !== "undefined" &&
        new Magic(magicApiKey) // ✨
    )

}

export const magic = createMagic()

console.log("magic setup", createMagic)

export default magic;
