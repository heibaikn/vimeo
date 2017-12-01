const Account = require('../schemas').Account
const bcrypt = require('bcryptjs')

const findById = function (id, callback) {
    Account.findById(id, callback)
}

const save = function (data, callback) {
    new Account(data).save(callback)
}

const find = function (query, fields, options, callback) {
    Account.find(query, fields, options, callback)
}

const findOne = function (query, fields, options, callback) {
    Account.findOne(query, fields, options, callback)
}

const update = function (conditions, update, options, callback) {
    Account.update(conditions, update, options, callback)
}

const remove = function (conditions, callback) {
    Account.remove(conditions, callback)
}

const fetchByEmail = function (email, callback) {
    Account.findOne({ email: email })
        .populate([
            {
                path: 'user_id'
            }
        ])
        .exec(callback)
}

const verifyPassword = function (password, savedPassword, callback) {
    bcrypt.compare(password, savedPassword, function (err, res) {
        if (err) console.log(err)
        callback(null, !!res)
    })
}

module.exports = {
    findById,
    save,
    find,
    findOne,
    update,
    remove,
    fetchByEmail,
    verifyPassword
}
