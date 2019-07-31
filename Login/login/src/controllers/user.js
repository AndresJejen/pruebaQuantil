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

function searchuser(req,res){

    // console.log(req.body);

    User.findOne({email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({mensaje:err})
        if(!user) return res.status(404).send({mensaje:"NO existe el usuario"})

        req.user= user
        res.status(200).send({"user":user});
    })
}

async function signUp(req,res)
{
    // console.log(req.body);

    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    await user.save().then(resp=>{
        return res.status(200).send(resp)
    });

    
}

module.exports = {
    signIn,
    signUp,
    searchuser
}