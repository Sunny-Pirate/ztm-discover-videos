/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'components')]
    },
    images: {
        domains: [
            'images.unsplash.com',
            'i.ytimg.com',
            "yt3.ggpht.com"
        ]
    }
}

module.exports = nextConfig
