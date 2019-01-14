const express = require('express');
const bindAppToComponentLoader = require('./loaders/index');
const app = express();
const port = 8000;

bindAppToComponentLoader(app, ['templates']);

app.get('/', (req, res) => res.render('layout.njk'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))