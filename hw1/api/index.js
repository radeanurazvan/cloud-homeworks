const http = require('http');
const SearchService = require('./services/search.service');
const fetch = require('node-fetch');
const config = require('./config');

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});

const logs = [];

const server = http.createServer(async (req, res) => {
    
    const requestStart = new Date().getTime();

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

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

    const response = await routes[route](req, res);
    const requestEnd = new Date().getTime();
    const duration = (requestEnd - requestStart) / 1000;
    logs.push({
        request: req.url,
        latency: duration,
        response: response
    });
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
        const response = JSON.stringify({songs});
        res.end(response);
        return response;
    },
    '/api/metrics': (req, res) => {
        const response = JSON.stringify({logs});
        res.end(response);
        return response;
    },
    '/api/spam': async (req, res) => {
        const favoriteTerms = ['green day', 'blink182', 'slipknot', 'queen', 'baby shark'];
        let spamSize = 500;
        const batchSize = 50;

        while(spamSize > 0) {
            const promises = Array(batchSize).fill(0).map(() => {
                const randomTerm = favoriteTerms[Math.floor(Math.random() * favoriteTerms.length)];
                const query = encodeURI(`?q=${randomTerm}`);
                return fetch(config.selfSearch + query);
            });
            await Promise.all(promises);

            spamSize -= batchSize;
        }

        const mean = logs.map(l => l.latency).reduce((accumulated, current) => accumulated + current, 0) / logs.length;
        res.end(JSON.stringify({mean}));
    }
};