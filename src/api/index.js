const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-xsrf-token, Accept");
    next();
  });

app.get('/', (request, response) => {
    response.json({info: 'J-joules Postgres API'})
})


app.get('/tests', db.getTests)
app.get('/callgraph', db.getCallgraph)
app.get('/snapshots_ids', db.getAllAnalysesIds)

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})

