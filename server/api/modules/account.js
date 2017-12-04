'use strict'

const Account = require('../../models').Account
const User = require('../../models').User
const Captcha = require('../../models').Captcha
const JWT = require('../../common/jwt')
const Tools = require('../../common/tools')
const Validation = require('../../common/validate')
const async = require('async')
const ERROR_CODE = require('../config/errorCode')
const bcrypt = require('bcryptjs')
const XSS = require('xss')
const path = require('path')
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: path.resolve(__dirname, '..'),
    config_dir: 'config'
})

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
            Account.verifyPassword(password, account.password, function (err, success) {
                if (err) console.log(err)
                if (success) {
                    User.findOne(
                        {
                            _id: account.user_id
                        },
                        {},
                        {},
                        function (err, user) {
                            if (err) console.log(err)
                            const accessToken = JWT.generate(config.jwt_token_secret, account.user_id, ip)
                            User.updateAccessTokenById(user.user_id, accessToken, function (err, accessToken) {
                                if (err) {
                                    console.log(err)
                                    res.status(200)
                                    res.send({
                                        succcess: false,
                                        errcode: ERROR_CODE.INTERNAL_SERVER_ERROR,
                                        errmsg: 'Failed to update access token',
                                        data: {}
                                    })
                                } else {
                                    user.access_token = accessToken
                                    callback(null, user)
                                }
                            })
                        }
                    )
                }
            })
        }
    ], function (err, user) {
        if (err) {
            const captcha = Captcha.generate()
            Captcha.save({
                captcha: captcha.text,
                ip: ip,
                user_id: user._id
            })
            res.status(200)
            res.send({
                succcess: false,
                errcode: ERROR_CODE.INVALID_REQUEST,
                errmsg: 'Failed to login',
                data: {}
            })
        } else {
            res.status(200)
            res.send({
                succcess: true,
                errcode: ERROR_CODE.SUCCESS,
                errmsg: '',
                data: user
            })
        }
    })
}

const register = function (req, res, next) {
    const userData = {
        nickname: req.body.nickname || '',
        email: req.body.email ? String(req.body.email) : '',
        password: req.body.password ? String(req.body.password) : '',
        avatar: req.body.avatar || '',
        gender: req.body.gender ? parseInt(req.body.gender) : -1,
        intro: req.body.intro ? req.body.intro : '',
        create_at: new Date()
    }

    async.waterfall([
        function (callback) {
            let checkResult = {}
            userData.nickname = XSS(userData.nickname, {
                whiteList: [],
                stripIgnoreTag: true
            })
            if (!Validation.nickname(userData.nickname)) {
                checkResult.nickname = {
                    success: false,
                    msg: 'invalid nickname'
                }
            }
            if (!Validation.password(userData.password)) {
                checkResult.password = {
                    success: false,
                    msg: 'invalid password'
                }
            }
            if (!Validation.gender(userData.gender)) {
                checkResult.gender = {
                    succcess: false,
                    msg: 'invalid value for gender'
                }
            }
            if (!Validation.email(userData.email)) {
                checkResult.gender = {
                    succcess: false,
                    msg: 'invalid email address'
                }
            }

            let hasErr = false
            for (let index in checkResult) {
                if (checkResult.hasOwnProperty(index)) {
                    hasErr = true
                }
            }
            if (hasErr) {
                res.status(200)
                res.send({
                    succcess: false,
                    errcode: ERROR_CODE.INVALID_REQUEST,
                    errmsg: 'Failed to register',
                    data: checkResult
                })
            } else {
                callback(null, checkResult)
            }
        },
        function (checkResult, callback) {
            Account.fetchByEmail(userData.email, function (err, account) {
                if (err) console.log(err)

                if (account) {
                    res.status(200)
                    res.send({
                        succcess: false,
                        errcode: ERROR_CODE.NOT_ACCEPTABLE,
                        errmsg: 'Email address exist!',
                        data: checkResult
                    })
                } else {
                    callback(null, checkResult)
                }
            })
        },
        function (checkResult, callback) {
            const saltRounds = 10
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) console.log(err)

                bcrypt.hash(userData.password, salt, function (err, hash) {
                    if (err) console.log(err)

                    userData.password = hash
                    callback(null, checkResult)
                })
            })
        },
        function (checkResult, callback) {
            User.create(userData, function (err, user) {
                if (err) console.log(err)
                Account.save({
                    user_id: user._id,
                    email: userData.email,
                    password: userData.password
                }, function (err, account) {
                    if (err) console.log(err)
                    callback(null, account)
                })
            })
        }
    ], function (err, result) {
        if (err) {
            res.status(200)
            res.send({
                succcess: false,
                errcode: ERROR_CODE.INVALID_REQUEST,
                errmsg: 'Failed to create account',
                data: {}
            })
        } else {
            res.status(200)
            res.send({
                succcess: true,
                errcode: ERROR_CODE.SUCCESS,
                errmsg: '',
                data: result
            })
        }
    })
}

module.exports = {
    login,
    register
}
