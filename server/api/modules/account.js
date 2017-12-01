const Token = require('../../models').Token
const Account = require('../../models').Account
const Captcha = require('../../models').Captcha
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
            Captcha.findOne(
                {
                    ip: ip
                },
                {
                    _id: 1
                },
                {
                    sort: { create_at: -1 }
                },
                function (err, result) {
                    if (err) console.log(err)
                    if (!result) return callback(null)

                    Captcha.findOne(
                        {
                            _id: captchaId
                        },
                        {},
                        {},
                        function (err, result) {
                            if (err) console.log(err)

                            if (result && result.captcha === captcha) {
                                callback(null)
                            } else {
                                res.status(200)
                                res.send({
                                    succcess: false,
                                    errcode: ERROR_CODE.INVALID_REQUEST,
                                    errmsg: 'Verify captcha failed',
                                    data: {}
                                })
                            }
                        }
                    )
                }
            )
        },
        function (callback) {
            if (!email) return callback(null, null)
            Account.fetchByEmail(email, function (err, account) {
                if (err) console.log(err)
                if (!account) {
                    res.status(200)
                    res.send({
                        succcess: false,
                        errcode: ERROR_CODE.NOT_FOUND,
                        errmsg: 'Failed to find account with the email address',
                        data: {}
                    })
                } else {
                    callback(null, account)
                }
            })
        },
        function (account, callback) {
            
        }
    ], function (err, result) {

    })
}

module.exports = {
    login
}
