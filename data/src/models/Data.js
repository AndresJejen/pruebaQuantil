'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = Schema({
    fecha : {type:Date, unique:true},
    demanda: Number,
})

module.exports = mongoose.model('demanda',DataSchema)