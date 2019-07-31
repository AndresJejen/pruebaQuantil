'use strict'

const express = require('express');
const router = express.Router();
const Datacontrollers = require('../controllers/Data.js');

router.get('/',(req,res)=>{
    res.status(200).send({
        mensaje: 'Login Server ok',
    })
})

//Semana Pasada
router.get('/api/week',Datacontrollers.getweek);

//Dia especifico
router.post('/api/day',Datacontrollers.getday);

//Ultimo día
router.get('/api/lastday',Datacontrollers.getlastday);

//Guardar Nuevo registro
router.post('/api/newday',Datacontrollers.savenewday);

//Retornar para predecir semana
router.get('/api/dataforpweek',Datacontrollers.getdata4nextweek);

module.exports =  router