'use strict'

const Token = require('../schemas').Token

const findById = function (id, callback) {
    Token.findById(id, callback)
}

const save = function (data, callback) {
    new Token(data).save(callback)
}

const find = function (query, fields, options, callback) {
    Token.find(query, fields, options, callback)
}

const findOne = function (query, fields, options, callback) {
    Token.findOne(query, fields, options, callback)
}

const update = function (conditions, update, options, callback) {
    Token.update(conditions, update, options, callback)
}

const remove = function (conditions, callback) {
    Token.remove(conditions, callback)
}

module.exports = {
    findById,
    save,
    find,
    findOne,
    update,
    remove
}
