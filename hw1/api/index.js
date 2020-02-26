const http = require('http');
const SearchService = require('./services/search.service');

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});


const server = http.createServer((req, res) => {
    if(req.method != 'GET') {
        res.statusCode = 400;
        res.end();
        return;
    }

    const resource = req.url.split('?')[0];
    const route = Object.keys(routes).find(k => k == resource);
    if(!route) {
        res.statusCode = 404;
        res.end();
        return;
    }

    routes[route](req, res);
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

const routes = {
    '/api/search': async (req, res) => {
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const searchParam = urlParams.get('q');
        if(!searchParam) {
            res.statusCode = 400;
            res.end();
            return;
        }

        const songs = await new SearchService().search(searchParam);
        res.end(JSON.stringify({songs}), null, 3);
    },
    '/api/logs': () => {},
    '/api/metrics': () => {},
};