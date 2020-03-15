class ResponseWrapper {
    constructor(res) {
        this.res = res;
    }
    
    status(code) {
        this.res.statusCode = code;
        return this;
    }

    json(object) {
        this.res.end(JSON.stringify(object));
        return this;
    }
}

const Bootstrapper = require('./bootstrapper');
const batteriesController = require('./controllers/batteries.controller');
const accumulatorsController = require('./controllers/accumulators.controller');
const energyProvidersController = require('./controllers/energy-providers.controller');
const customersController = require('./controllers/customers.controller');
const ordersController = require('./controllers/orders.controller');
const Resolver = require('./route-resolver');
const resolver = new Resolver();

var http = require('http');
new Bootstrapper().bootsrapAll();

const routes = [
    ...batteriesController,
    ...accumulatorsController,
    ...energyProvidersController,
    ...customersController,
    ...ordersController
];

const server = http.createServer(async (req, res) => {
    const bodyChunks = [];    
    req.on('data', chunk => bodyChunks.push(chunk));
    req.on('end',() => {
        req.body = bodyChunks.length > 0 ? JSON.parse(bodyChunks) : {};
        handleRequest(req, res);
    });
});

let port = process.env.PORT || 5000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});

function handleRequest(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

    const route = resolver.resolve(req, routes);
    if(!route) {
        throw `No route configured for ${req.method} ${req.url}`;
    }

    route.handler(req, new ResponseWrapper(res));
}