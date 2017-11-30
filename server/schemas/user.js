'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
    nickname: { type: String }, // nickname
    create_at: { type: Date, default: Date.now }, // account creation date
    last_login_in: { type: Date, default: Date.now }, // last login date
    disable_send_message: { type: Date, default: Date.now }, // diable send message
    role: { type: Number, default: 0 }, //  role
    avatar: { type: String, default: '' }, // avatar
    gender: { type: Number, default: 0 }, // gender 0 male  1 female
    intro: { type: String, default: '' }, // self introduction
    // source: { type: Number, default: 0 }, //  register source
    post_count: { type: Number, default: 0 }, // post count
    comment_count: { type: Number, default: 0 }, // comment count
    fans_count: { type: Number, default: 0 }, // fans count
    like_count: { type: Number, default: 0 }, // like count
    follow_people: [{ type: ObjectId, ref: 'User' }],
    follow_people_count: { type: Number, default: 0 },
    follow_projects: [{ type: ObjectId, ref: 'Project' }],
    follow_projects_count: { type: Number, default: 0 },
    follow_videos: [{ type: ObjectId, ref: 'Videos' }],
    follow_videos_count: { type: Number, default: 0 },
    access_token: { type: String }
})

UserSchema.set('toJSON', { getters: true })

mongoose.model('User', UserSchema)
