'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    displayName : {type:String, required: true},        
    email: {type:String,unique:true,required: true},
    password: {type:String ,required: true}   
})

module.exports = mongoose.model('users',UserSchema)