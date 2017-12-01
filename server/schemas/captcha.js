'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var CaptchaSchema = new Schema({
    captcha: { type: String, required: true },
    area_code: { type: String },
    phone: { type: String },
    user_id: { type: ObjectId, ref: 'User' },
    email: { type: String, lowercase: true, unique: true, trim: true },
    create_at: { type: Date, expires: 60 * 15, default: Date.now },
    ip: { type: String }
})

mongoose.model('Account', CaptchaSchema)
