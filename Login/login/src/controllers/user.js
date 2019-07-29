'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')


function signIn(req,res){
    User.find({email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({mensaje:err})
        if(!user) return res.status(404).send({mensaje:"NO existe el usuario"})

        req.user= user
        res.status(200).send({
            mensaje: 'Te has logueado correctamente',
        })
    })
}

module.exports = {
    signIn
}