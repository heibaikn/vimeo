'use strict'

const express = require('express')
const router = express.Router()
const Account = require('./modules/account')
const Token = require('./modules/token')

router.post('/login', Account.login)

router.post('/token/save', Token.testSave)

router.post('/token/get', Token.testGet)

module.exports = router
