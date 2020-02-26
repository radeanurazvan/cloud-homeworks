const fetch = require('node-fetch');
const config = require('../config').vimeo;

module.exports = class VimeoService {
    async search(q) {
        return (await this.getVimeoResults(q))
            .map(item => ({
                artist: '',
                url: item.link,
                image: item.pictures.sizes[1].link,
                name: item.name
            }));
    }

    async getVimeoResults(q) {
        const query = encodeURI(`&query=${q}`);
        
        const response = await fetch(config.urls.search + query,{
            headers: {
                'Authorization': `Bearer ${config.key}`
            }
        });
        const payload = await response.json();
        return payload['data'];
    }
};