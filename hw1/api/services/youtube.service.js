const fetch = require('node-fetch');
const config = require('../config').youtube;

module.exports = class YoutubeService {
    async search(q) {
        return (await this.getYoutubeResults(q))
            .map(item => ({
                artist: '',
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                image: item.snippet.thumbnails.default.url,
                name: item.snippet.title
            }));
    }

    async getYoutubeResults(q) {
        const query = encodeURI(`&q=${q}`);
        
        const response = await fetch(config.urls.search + query);
        const payload = await response.json();
        return payload['items'];
    }
};