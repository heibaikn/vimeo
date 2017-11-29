'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const oAuthTypes = [
    'github',
    'twitter',
    'facebook',
    'google',
    'linkedin'
]

const UserSchema = new Schema({
    username: { type: String, unique: true, trim: true },
    hashedPassword: { type: String, trim: true, default: '' },
    nickname: { type: String, trim: true, default: '' },
    email: { type: String, lowercase: true, unique: true, trim: true, default: '' },
    sex: { type: Number, default: 0 }, // 0 male 1 female
    age: { type: Number, defautl: 0, min: 0, max: 150 },
    status: { type: Number, default: 0 }, // 0 usable 1 disable
    avatar: { type: String, default: 'avatar.jpg' },
    cityCode: { type: String, default: '' },
    createTime: { type: Date, default: Date.now },
    provider: { type: String, default: '' },
    lastLoginTime: { type: Date }
})

const validatePresenceOf = value => value && value.length

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ user_id: 1 }, { unique: true })
UserSchema.index({ email: 1, user_id: 1 }, { unique: true })

/**
 * Validations
 */

UserSchema.path('username').validate(function (username) {
    if (this.skipValidation()) return true
    return username.length
}, 'Name cannot be blank')

UserSchema.path('email').validate(function (email) {
    if (this.skipValidation()) return true
    return email.length
}, 'Email cannot be blank')

UserSchema.path('email').validate(function (email, fn) {
    const User = mongoose.model('User')
    if (this.skipValidation()) fn(true)

    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0)
        })
    } else fn(true)
}, 'Email already exists')

UserSchema.path('nickname').validate(function (nickname) {
    if (this.skipValidation()) return true
    return nickname.length
}, 'Nickname cannot be blank')

UserSchema.path('hashedPassword').validate(function (hashedPassword) {
    if (this.skipValidation()) return true
    return hashedPassword.length && this._password.length
}, 'Password cannot be blank')

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
    if (!this.isNew) return next()

    if (!validatePresenceOf(this.password) && !this.skipValidation()) {
        next(new Error('Invalid password'))
    } else {
        next()
    }
})

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword
    },

    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },

    /**
   * Validation is not required if using OAuth
   */

    skipValidation: function () {
        return ~oAuthTypes.indexOf(this.provider)
    }
}

mongoose.model('User', UserSchema)
