const youtubeConfig = {
    part: 'snippet',
    type: 'video',
    maxResults: 2,
    apiKey:'AIzaSyCafzAR0XTWF20mouu-EobOrrwPVh8BCwk'
};

module.exports = {
    spotify: {
        urls: {
            token: 'https://accounts.spotify.com/api/token',
            search: 'https://api.spotify.com/v1/search'
        },
        authorization: 'Basic YTkyNmI1ZTExODFhNGYyYjgxZGQwYzU0MThkM2VmYmY6Yjg1NDQwNWQzYTNlNDg1MWI1YWNjOTM1NjY3MmQxOTI=',
    },
    youtube: {
        urls: {
            search: `https://www.googleapis.com/youtube/v3/search?part=${youtubeConfig.part}&type=${youtubeConfig.type}&maxResults=${youtubeConfig.maxResults}&key=${youtubeConfig.apiKey}`
        }
    },
    vimeo: {
        key: '3434035c7a4592543bf9a48fdcc2dd09',
        urls: {
            search: 'https://api.vimeo.com/videos?page=1&per_page=2'
        }
    },
    selfSearch: 'http://localhost:3000/api/search' 
};