'use strict'

const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const modelpath = path.join(__dirname, '/models')
const helmet = require('helmet')
const API_V1 = require('')

const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: __dirname,
    config_dir: 'config'
})

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('port', config.server_port)
app.set('jwtTokenSecret', config.jwt_token_secret)
app.use(helmet())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

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

app.use('/api/v1', API_V1())

module.exports = app
