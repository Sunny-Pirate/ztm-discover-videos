const getEnvironmentVariable = (environmentVariable) => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        throw new Error(
            `Couldn't find environment variable: ${environmentVariable}`
        );
    } else {
        return unvalidatedEnvironmentVariable;
    }
};

export const config = {
    youtubeApiKey: getEnvironmentVariable("YOTUBE_API_KEY"),
    magicApiKey: getEnvironmentVariable("MAGIC_API_KEY")
};
