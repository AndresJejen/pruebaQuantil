'use strict'

const express = require('express');
const router = express.Router();
const Datacontrollers = require('../controllers/Data.js');

router.get('/',(req,res)=>{
    res.status(200).send({
        mensaje: 'Login Server ok',
    })
})

router.get('/api/week',Datacontrollers.getweek);

router.post('/api/day',Datacontrollers.getday);

router.get('/api/lastday',Datacontrollers.getlastday);

router.post('/api/newday',Datacontrollers.savenewday);

module.exports =  router