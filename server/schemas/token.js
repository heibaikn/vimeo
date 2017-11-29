'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var TokenSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    token: { type: String },
    exchange_count: { type: Number, default: 0 },
    ip: { type: String },
    create_at: { type: Date, expires: 60 * 60 * 24 * 30, default: Date.now }
})

TokenSchema.index({ user_id: 1, token: 1 })

mongoose.model('Token', TokenSchema)
