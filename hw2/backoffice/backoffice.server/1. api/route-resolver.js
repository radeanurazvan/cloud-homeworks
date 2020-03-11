module.exports = class RouteResolver {
    pathDelimiter = '/';
    parameterPrefix = ':';

    resolve(req, routes) {
        const splitUrl = req.url.split(this.pathDelimiter);
        const route = routes
            .filter(r => req.method === r.verb)
            .filter(r => r.path.split(this.pathDelimiter).length === splitUrl.length)
            .find(c => this.matchesConfiguredPath(splitUrl, c.path));
        
        if(!route) {
            return route;
        }

        const parameters = this.extractParameters(splitUrl, route.path);
        if(parameters.length > 0) {
            req.params = {};
            parameters.forEach(p => req.params[p.name] = p.value);
        }

        return route;
    }

    matchesConfiguredPath(splitUrl, path) {
        const splitPath = path.split(this.pathDelimiter);
        for(let index = 0; index < splitUrl.length; index++){
            let isCompliant = true;
            
            const urlSegment = splitUrl[index];
            const pathSegment = splitPath[index];

            isCompliant = urlSegment === pathSegment || this.isParameter(pathSegment);

            if(!isCompliant) {
                return false;
            }
        }

        return true;
    }

    extractParameters(splitUrl, path) {
        const splitPath = path.split(this.pathDelimiter);
        return splitPath.map((segment, index) => ({segment, index}))
            .filter(x => this.isParameter(x.segment))
            .map(x => ({
                name: x.segment.replace(this.parameterPrefix, ''),
                value: splitUrl[x.index]
            }));
    }

    isParameter(segment) {
        return segment.startsWith(this.parameterPrefix);
    }
}