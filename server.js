const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api = require('./service/api');
app.use(api);

app.use('/', express.static('www'))

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})