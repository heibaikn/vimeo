const Token = require('../../models').Token
const JWT = require('../../common/jwt')
const Tools = require('../../common/tools')
const ERROR_CODE = require('../config/errorCode')
const path = require('path')
const config = require('config-lite')({
    filename: 'default.js',
    config_basedir: path.join('../', __dirname),
    config_dir: 'config'
})

const exchange = function (req, res, next) {
    const ip = Tools.getIP(req)
    const token = String(req.headers.accessToken || req.body.accessToken)
    if (!token) {
        res.status(200)
        res.send({
            succcess: false,
            errcode: ERROR_CODE.INVALID_REQUEST,
            errmsg: 'No valid token provided!',
            data: {}
        })
    } else {
        const decoded = JWT.decode(token, config.jwt_token_secret)

        if (!decoded || !decoded.user_id) {
            res.status(200)
            res.send({
                succcess: false,
                errcode: ERROR_CODE.UNAUTHORIZED,
                errmsg: 'No valid token provided!',
                data: {}
            })
        } else {
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
                    if (result && result.ip === ip) {
                        Token.update({
                            _id: result._id
                        },
                        {
                            exchange_count: result.exchange_count + 1
                        }
                        )
                        let token = JWT.generate(config.jwt_token_secret, decoded.user_id, ip)
                        res.status(200)
                        res.send({
                            succcess: true,
                            errcode: ERROR_CODE.SUCCESS,
                            errmsg: '',
                            data: {
                                token: token
                            }
                        })
                    } else {
                        Token.remove({}, err => {
                            if (err) console.log(err)
                            res.status(200)
                            res.send({
                                succcess: false,
                                errcode: ERROR_CODE.SUCCESS,
                                errmsg: 'Failed to exchange token',
                                data: {}
                            })
                        })
                    }
                }
            )
        }
    }
}

module.exports = {
    exchange
}
