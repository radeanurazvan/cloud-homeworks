const fetch = require('node-fetch');
const config = require('../config').spotify;

module.exports = class SpotifyService {
    async search(q) {
        return (await this.getSpotifyTracks(q))
            .map(track => ({
                artist: track.artists[0].name,
                url: track.external_urls.spotify,
                image: track.album.images[1].url,
                name: track.name
            }));
    }

    async getToken() {
        const response = await fetch(config.urls.token, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': config.authorization
            },
            body: 'grant_type=client_credentials'
        });
        const payload = await response.json();
        return payload['access_token'];
    }

    async getSpotifyTracks(q) {
        const query = encodeURI(`?q=${q}&type=track`);
        const token = await this.getToken();
        
        const response = await fetch(config.urls.search + query, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const payload = await response.json();
        return payload['tracks']['items'];
    }
};