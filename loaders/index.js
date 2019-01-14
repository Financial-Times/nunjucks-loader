const ComponentLoader = require('./component-loader');
const nunjucks = require('nunjucks');

function bindAppToComponentLoader(app, loaders = [], opts = {}){
    loaders = loaders.map((loader) => {
        return typeof loader === 'string' ? new nunjucks.FileSystemLoader(loader) : loader;
    })
    loaders =  [new ComponentLoader()].concat(loaders);
    var njkEnv = new nunjucks.Environment(loaders, opts);
    njkEnv.express(app);
    return njkEnv;
}

module.exports = bindAppToComponentLoader;