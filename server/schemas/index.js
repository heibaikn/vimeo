'use strict'

require('./token')
require('./user')
require('./account')
require('./captcha')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: path.resolve(__dirname, '..'),
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
exports.User = mongoose.model('User')
exports.Account = mongoose.model('Account')
exports.Captcha = mongoose.model('Captcha')
