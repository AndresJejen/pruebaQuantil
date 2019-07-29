'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Configuracion body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Rutas
app.use(require('./src/routes/routes'));
module.exports = app