const ComponentLoader = require('./component-loader');
const nunjucks = require('nunjucks');
const ComponentTag = require('../extentions/component-tag');

function bindAppToComponentLoader(app, loaders = [], opts = {}){
    loaders = loaders.map((loader) => {
        return typeof loader === 'string' ? new nunjucks.FileSystemLoader(loader) : loader;
    })
    loaders =  [new ComponentLoader()].concat(loaders);
    var njkEnv = new nunjucks.Environment(loaders, opts);
    njkEnv.addExtension('RemoteExtension', new ComponentTag());
    njkEnv.express(app);
    return njkEnv;
}

module.exports = bindAppToComponentLoader;