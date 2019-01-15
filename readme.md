# Overview
Contains an loader and an tag for loading nunjucks templates from external packages. 

### Usage:
 The `ComponentLoader` looks for includes pre-pended with `~` and attempts to load templates using `require.resolve();`. This can be added to a nunjucks environment by creating a new nunjucks ENV using ` new nunjucks.Environment( new ComponentLoader() )`. Usage can be seen in [layout.njk](templates/layout.njk)

 The ComponentTag can be added by running nunjucks. `nunjucks.addExtension('RemoteExtension', new ComponentTag());` . Tag an be used in all rendered nunjucks templates using 
 ```nunjucks
{% component 'my-good-component' %}
{% component 'my-good-component' with {some: context} %}
 ```
 Main.njk is added to the end of the component string automatically before the template is included.

 ### Demo:
 Run `npm install && npm start` after cloning the repo.