


export const configuration = () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    base_url: process.env.GITHUB_API
})