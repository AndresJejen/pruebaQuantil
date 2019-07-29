'use strict'

const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user')

router.get('/',(req,res)=>{
    res.status(200).send({
        mensaje: 'Login Server ok',
    })
})

router.post('/api/signin',UserControllers.signIn)

module.exports =  router;