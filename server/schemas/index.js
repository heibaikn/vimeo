require('./token')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: path.join('../', __dirname),
    config_dir: 'config'
})

mongoose.Promise = global.Promise

const promise = mongoose.connect(config.db_url, {
    useMongoClient: true
})

promise.then(function (db) {
    console.log('Database connected')
})

exports.Token = mongoose.model('Token')
