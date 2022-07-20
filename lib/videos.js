const fetchVideos = async (url) => {
    const kYuotubeApiKey = process.env.YOTUBE_API_KEY
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
        `https://${BASE_URL}/${url}&maxResults=25&key=${kYuotubeApiKey}`
    );

    return await response.json();
};

export const getCommonVideos = async (url) => {
    try {
        const isDev = process.env.DEVELOPMENT;
        const data = isDev ? videoTestData : await fetchVideos(url);
        if (data?.error) {
            console.error("Youtube API error", data.error);
            return [];
        }

        return data?.items.map((item) => {
            const id = item.id?.videoId || item.id;
            const snippet = item.snippet;
            return {
                title: snippet?.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                id,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : {viewCount: 0},
            };
        });
    } catch (error) {
        console.error("Something went wrong with video library", error);
        return [];
    }
};

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
};
export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IT`;
    return getCommonVideos(URL);
};
