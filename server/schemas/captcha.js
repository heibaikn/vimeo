'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var CaptchaSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    email: { type: String, lowercase: true, unique: true, trim: true },
    password: { type: String },
    create_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
})

AccountSchema.index({ email: 1 }, { unique: true })
AccountSchema.index({ user_id: 1 }, { unique: true })
AccountSchema.index({ email: 1, user_id: 1 }, { unique: true })

mongoose.model('Account', CaptchaSchema)
