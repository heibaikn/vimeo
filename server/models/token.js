const Token = require('../schemas').Token

exports.fetch = function (query, select, options, callback) {
    let find = Token.find(query, select)
    for (let i in options) {
        find[i](options[i])
    }
    find.exec(callback)
}
