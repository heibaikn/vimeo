'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var CaptchaSchema = new Schema({
    captcha: { type: String, required: true },
    user_id: { type: ObjectId, ref: 'User' },
    create_at: { type: Date, expires: 60 * 15, default: Date.now },
    ip: { type: String }
})

mongoose.model('Account', CaptchaSchema)
