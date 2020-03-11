class Route {
    constructor(path, verb, handler) {
        this.path = path;
        this.verb = verb;
        this.handler = handler;
    }
}

class RouteWithPath {
    constructor(path) {
        this.path = path;
    }

    get(handler) {
        return new Route(this.path, 'GET', handler);
    }

    post(handler) {
        return new Route(this.path, 'POST', handler);
    }

    patch(handler) {
        return new Route(this.path, 'PATCH', handler);
    }

    put(handler) {
        return new Route(this.path, 'PUT', handler);
    }

    delete(handler) {
        return new Route(this.path, 'DELETE', handler);
    }
}

module.exports = class Router {
    constructor(prefix) {
        this.prefix = prefix;
    }

    route(path) {
        return new RouteWithPath(`${this.prefix}${path}`);
    }
}