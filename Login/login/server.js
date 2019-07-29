"use strict"

//Constantes del Servidor 
const mongoose = require('mongoose');
const app = require('./app.js');
const path = require('path')
const port = process.env.PORT || 3000;
const config = require('./config');

//Conexion Base de datos y lanzamiento del servidor
mongoose.connect(config.CONNMONGO, {
    useNewUrlParser: true
    ,auth: {
      user: config.USERMONGO,
      password: config.PSSWMONGO
    }
  })
  .then(() => {
        console.log('Connection to MongoDB successful OK')
        //Ejecución del servidor
        app.listen(port,()=>{
        console.log(`API REST EJECUTANDOSE EN http://localhost:${port}`);
});
    })
  .catch((err) => console.error(err));

