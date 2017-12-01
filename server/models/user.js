const User = require('../schemas').User

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

const create = function (data, callback) {
    let user = new User()
    user.nickname = data.username
    user.avatar = data.avatar
    user.gender = data.gender
    user.intro = data.intro
    user.save(callback)
}

const findById = function (id, callback) {
    User.findById(id, callback)
}

const updateAccessTokenById = function (userId, accessToken, callback) {
    User.update(
        { _id: userId },
        { access_token: accessToken },
        function (err) {
            callback(err, accessToken)
        }
    )
}

module.exports = {
    findById,
    save,
    find,
    findOne,
    update,
    remove,
    create,
    updateAccessTokenById
}
