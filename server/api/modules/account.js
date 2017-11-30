const Token = require('../../models').Token
const JWT = require('../../common/jwt')
const Tools = require('../../common/tools')
const async = require('async')
const ERROR_CODE = require('../config/errorCode')
const path = require('path')

const login = function (req, res, next) {
    const ip = Tools.getIP(req)
    const email = req.body['email']
    const password = req.body['password']
    const captcha = req.body['captcha'] || ''
    const captchaId = req.body['captcha_id'] || ''

    async.waterfall([
        function (callback) {
            if (!email || !password) {
                res.status(200)
                res.send({
                    succcess: false,
                    errcode: ERROR_CODE.INVALID_REQUEST,
                    errmsg: 'Please provide your email and password',
                    data: {}
                })
            } else if (!ip) {
                res.status(200)
                res.send({
                    succcess: false,
                    errcode: ERROR_CODE.INVALID_REQUEST,
                    errmsg: 'Can\'t locate your ip address',
                    data: {}
                })
            } else {
                callback(null)
            }
        },
        function (callback) {
            
        }
    ], function(err, result) {

    })
}

module.exports = {
    login
}
