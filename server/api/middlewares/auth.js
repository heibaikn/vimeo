'use strict'

const User = require('../../models').User
const Token = require('../../models').Token
const JWT = require('../../common/')
const path = require('path')
const ERROR_CODE = require('../config/errorCode')
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: path.join('../', __dirname),
    config_dir: 'config'
})

const verifyToken = function (req, callBack) {
    const token = String(req.headers.accessToken || req.body.accessToken || '')

    if (!token) {
        callBack(false)
        return
    }

    const decoded = JWT.decode(token, config.jwt_token_secret)
    if (!decoded) {
        console.log('Failed to decode token')
        return callBack(false)
    }

    if (decoded && decoded.expires && decoded.expires < new Date().getTime()) {
        console.log('Token expires')
        return callBack(false)
    }

    Token.findOne(
        {
            user_id: decoded.user_id,
            token: token
        },
        {},
        {
            populate: {
                path: 'user_id'
            }
        },
        function (err, result) {
            if (err) console.log(err)

            if (result) {
                let userId = result.user_id
                req.userId = userId

                if (new Date().getTime() - new Date().getTime() > 1000 * 60 * 5) {
                    User.update(
                        {
                            _id: userId
                        },
                        {
                            last_sign_at: new Date()
                        },
                        function (err) {
                            if (err) console.log(err)
                        }
                    )
                }
                callBack(true)
            } else {
                callBack(false)
            }
        }
    )
}

const NoVerify = function (req, res, next) {
    next()
}

const Athentication = function (req, res, next) {
    verifyToken(req, function (result) {
        if (!result) {
            return res.status(200).send({
                succcess: false,
                errcode: ERROR_CODE.UNAUTHORIZED,
                errmsg: 'Failed to authorize by token!',
                data: {}
            })
        } else {
            next()
        }
    })
}

module.exports = {
    NoVerify,
    Athentication
}
