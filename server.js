const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const webhook = require("./service/webhook");
app.use(webhook);

app.use('/', express.static('www'));

app.use(bodyParser.json());

const api = require('./service/api');
app.use(api);

const port = 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})



