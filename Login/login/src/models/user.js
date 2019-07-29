'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    email : {type:String, unique:true, lowercase:true},
    displayName: String,
    password: {type: String, select:false}
})

module.exports = mongoose.model('users',UserSchema)