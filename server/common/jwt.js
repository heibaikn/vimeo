const jwt = require('jsonwebtoken')
const Token = require('../models').Token

/**
 * Generate token and save
 * @param {*} jwtTokenSecret
 * @param {*} userId
 * @param {*} ip
 */
const generate = function (jwtTokenSecret, userId, ip) {
    let token = jwt.sign({
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
        user_id: userId
    }, jwtTokenSecret)

    Token.save({
        user_id: userId,
        token: token,
        ip: ip
    }, (err) => {
        if (err) console.log(err)
    })

    return {
        user_id: userId,
        accessToken: token
    }
}

const decode = function (token, jwtTokenSecret) {
    try {
        return jwt.verify(token, jwtTokenSecret)
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = {
    generate,
    decode
}
