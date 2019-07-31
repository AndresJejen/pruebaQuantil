'use strict'

const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user')

router.get('/',(req,res)=>{
    res.status(200).send({
        mensaje: 'Login Server ok',
    })
})

// Ingreso
router.post('/api/signin',UserControllers.signIn)

//registrar
router.post('/api/signup',UserControllers.signUp) 

router.post('/api/search',UserControllers.searchuser) 
/////////////

module.exports =  router;