'use strict'

var mongoose = require('mongoose')

const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: __dirname,
    config_dir: 'config'
})

mongoose.connect(config.db_url, { useMongoClient: true })

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + config.db_url)
})

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})
const DB = mongoose.connection

export default DB
