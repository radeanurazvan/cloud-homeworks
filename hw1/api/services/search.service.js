const SpotifyService = require('./spotify.service');
const YoutubeService = require('./youtube.service');
const VimeoService = require('./vimeo.service');

module.exports = class SearchService {
    constructor() {
        this.services = [new SpotifyService(), new YoutubeService(), new VimeoService()];
    }

    async search(q) {
        const promises = this.services.map(s => s.search(q));
        return (await Promise.all(promises))
            .reduce((accumulated, current) => [...accumulated, ...current], []);
    }
};