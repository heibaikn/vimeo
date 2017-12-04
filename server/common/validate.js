'use strict'

const nickname = function (str) {
    if (!str) return false
    const reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/
    return reg.test(str)
}

const password = function (str) {
    if (!str) return false
    const reg = /^[0-9a-zA-Z]{6,20}$/
    return reg.test(str)
}

const gender = function (gender) {
    if (gender === 0 || gender === 1) {
        return true
    } else {
        return false
    }
}

const email = function (str) {
    if (!str) return false
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    return reg.test(str)
}

module.exports = {
    nickname,
    password,
    gender,
    email
}
