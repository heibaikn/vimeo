'use strict'

const User = require('../../models').User
const ERROR_CODE = require('../config/errorCode')

const fetchById = function (req, res, next) {
    const userId = req.params.id
    User.fetchById(userId, function (err, userData) {
        if (err) console.log(err)
        if (!userData) {
            res.status(200)
            res.send({
                succcess: false,
                errcode: ERROR_CODE.NOT_FOUND,
                errmsg: err,
                data: {}
            })
        } else {
            res.status(200)
            res.send({
                succcess: true,
                errcode: ERROR_CODE.SUCCESS,
                errmsg: err,
                data: JSON.stringify(userData)
            })
        }
    })
}

module.exports = {
    fetchById
}
