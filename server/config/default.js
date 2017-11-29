'use strict'

module.exports = {
    server_port: 8001,
    db_url: 'mongodb://localhost:27017/vimeo',
    db_name: 'vimeo',
    jwt_token_secret: 'jwt_token_secret_vimeo',
    cookie_secret: 'cookie_secret_vimeo',
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000
        }
    }
}
