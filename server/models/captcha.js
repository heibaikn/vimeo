const Captcha = require('../schemas').Captcha

const findById = function (id, callback) {
    Captcha.findById(id, callback)
}

const save = function (data, callback) {
    new Captcha(data).save(callback)
}

const find = function (query, fields, options, callback) {
    Captcha.find(query, fields, options, callback)
}

const findOne = function (query, fields, options, callback) {
    Captcha.findOne(query, fields, options, callback)
}

const update = function (conditions, update, options, callback) {
    Captcha.update(conditions, update, options, callback)
}

const remove = function (conditions, callback) {
    Captcha.remove(conditions, callback)
}

module.exports = {
    findById,
    save,
    find,
    findOne,
    update,
    remove
}
