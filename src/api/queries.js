const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'sonar',
    host: 'db',
    database:'sonar',
    password: 'sonar',
    port: 5432,
})
console.log("tests");
const getTests = (request,response) => {

    let end = "";

    let req = 'SELECT * FROM tests';
    if (Object.keys(request.query).length == 1 && Object.keys(request.query)[0] == "project_key" )
       end = ` where project_key = '${request.query.project_key}'` 
    if (Object.keys(request.query).length == 1 && Object.keys(request.query)[0] == "analysed_at" )
        end = ` where analysed_at = '${request.query.analysed_at}'`     

    if (Object.keys(request.query).length == 2)
        end = ` where project_key = '${request.query.project_key}' and analysed_at = '${request.query.analysed_at}'`

    pool.query(req+end,(error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTest = (request,response) => {
    
    pool.query(`SELECT * from tests WHERE test = '${request.query.test}'`, (error,result) => {
        if(error)
            throw error
        response.status(200).json(result.rows)
    })
}

const getCallgraph = (request,response) => {

    let req = 'SELECT * FROM callgraph';

    if(Object.keys(request.query).length == 1 && Object.keys(request.query)[0] == "target")
        req += ` where target = '${request.query.target}'`

    pool.query(req, (error,result) => {
        if(error){
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const getAllAnalysesIds = (request,response) => {

    let req = "SELECT created_at as id from snapshots ORDER BY id DESC";
    if(Object.keys(request.query).length == 1 && Object.keys(request.query)[0] == "limit")
        req += ` LIMIT ${request.query.limit}`;
    pool.query(req, (error,result) => {
        if(error)
            throw error
        response.status(200).json(result.rows)
    })
}

module.exports = {
    getTests,
    getCallgraph,
    getAllAnalysesIds,
    getTest,
}