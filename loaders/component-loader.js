const fs = require('fs');

class ComponentLoader{

    constructor(){
    }

    getSource(templatePath){
        const targetRegex = /^~(.*)/;
        const matches = templatePath.match(targetRegex);
        if(matches === null) {
            return null;
        }
        templatePath = require.resolve(matches[1]);
        return {
            'src': fs.readFileSync(templatePath, "utf8"),
            'path': templatePath
        } 
    }
}

module.exports = ComponentLoader;