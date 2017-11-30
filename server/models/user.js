const User = require('../schemas').User

const findById = function (id, callback) {
    User.findById(id, callback)
}

const save = function (data, callback) {
    new User(data).save(callback)
}

const find = function (query, fields, options, callback) {
    User.find(query, fields, options, callback)
}

const findOne = function (query, fields, options, callback) {
    User.findOne(query, fields, options, callback)
}

const update = function (conditions, update, options, callback) {
    User.update(conditions, update, options, callback)
}

const remove = function (conditions, callback) {
    User.remove(conditions, callback)
}

module.exports = {
    findById,
    save,
    find,
    findOne,
    update,
    remove
}
