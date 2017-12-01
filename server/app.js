'use strict'

const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const modelpath = path.join(__dirname, '/models')
const helmet = require('helmet')
const API_V1 = require('./api/api-v1')

console.log(__dirname)
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: __dirname,
    config_dir: 'config'
})

const app = express()

const server = http.createServer(app)

app.set('env', process.env.NODE_ENV || 'development')
app.set('port', config.server_port)
app.set('jwtTokenSecret', config.jwt_token_secret)
app.use(helmet())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Bootstrap models
fs.readdirSync(modelpath)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(path.join(modelpath, file)))

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('X-Powered-By', '3.2.1')
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

app.use('/api/v1', API_V1)
app.use('/', function (req, res) {
    res.send('运行中')
})

app.use(function (req, res, next) {
    res.status(404)
    res.send('404 NOT FOUND')
})

server.listen(config.server_port)

module.exports = app
