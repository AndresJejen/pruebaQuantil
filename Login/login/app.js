'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Configuracion body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

//Rutas
app.use(require('./src/routes/routes'));
module.exports = app