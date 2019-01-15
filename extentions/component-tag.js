const nunjucks = require('nunjucks');
const fs = require('fs')

/**
 * Allows for components to be included using something like {% component 'some-component' with {"var": var} %}
 */
class ComponentTag{
    constructor(){
        this.tags = ['component'];
    }

    parse(parser, nodes, lexer){
        //Parse component tag token
        let componentTag = parser.nextToken();
        //Parse the string that appears after it as its include path
        let componentPath = parser.parseExpression();
        //Peek at the next expression and see if it is a 'with'
        let componentWith = parser.peekToken();
        let context = null;
        if(componentWith.value === 'with' ){
            //If so consume the with token and the following json object
            parser.nextToken();
            context  =  parser.parseAggregate();
        }
        
        //Advance to the end of the component block
        parser.advanceAfterBlockEnd(componentTag);

        //Create nodes for the args in the AST and pass it through to the expression
        let args = new nodes.NodeList();
        args.addChild(componentPath);
        if(context !== null){
            args.addChild(context)
        }

        //Leave callback to main template include in AST
        return new nodes.CallExtension(this, 'run', args);
    }
    
    run(ctx, componentPath, includeContext){
        includeContext = includeContext || {};
 
        const regex = /(\/main\.njk)?$/
        const componentTemplatePath = componentPath.replace(regex, '/main.njk');
        const componentPathFull = require.resolve(componentTemplatePath);

        const templateString = fs.readFileSync(componentPathFull, "utf8");
        let template = nunjucks.compile(templateString);
        return new nunjucks.runtime.SafeString(template.render(includeContext));
    }
    
}

module.exports = ComponentTag;