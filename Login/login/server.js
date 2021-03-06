"use strict"

//Constantes del Servidor 
const mongoose = require('mongoose');
const app = require('./app.js');
const path = require('path')
const port = process.env.PORT || 3000;
require('dotenv').config();

//Conexion Base de datos y lanzamiento del servidor
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true
    ,auth: {
      user: process.env.MONGOUSER,
      password: process.env.MONGOPASS
    }
  })
  .then(() => {
        console.log('Connection to MongoDB successful OK')
        //Ejecución del servidor
        app.listen(port,()=>{
        console.log(`LOGIN SERVER REST EJECUTANDOSE EN http://localhost:${port}`);
});
    })
  .catch((err) => console.error(err));

