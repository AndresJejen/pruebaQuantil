//importaciones temporales
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

//Configuraciones
const { JWTSECRET } = require('../../../config');                   //Importa el modulo de configuraciones globales

module.exports = {
    //Resolver Create a new User
    createUser: async (args) =>{                                                
        try{

            // console.log(args)
            const Existinguser = await fetch('http://localhost:3000/api/search',
                {
                    method:'post',
                    body:JSON.stringify({email:args.userInput.email}),
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors"
                })

            // console.log(Existinguser)

            if (Existinguser.status != 404){
                throw new Error('Esta Email ya está registrado.');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password,12);

            //Data Nuevo user
            const newuser = {
                displayName: args.userInput.displayName,
                email: args.userInput.email,
                password: hashedPassword
            }

            // Enviar a Auth Server Sign Up
            const response = await fetch('http://localhost:3000/api/signup',
                {
                    method:'post',
                    body:JSON.stringify(newuser),
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors"
                })
                
            const data = await response.json()

            return {
                ...data,
                password: null, 
                _id: data._id
            };
            
        }    
        catch(err) {
            console.error(`Error en guardar un nuevo usuario ${err}`)
            throw err;
        };
   },
   login: async ({email,password})=>{
        
        const Existinguser = await fetch('http://localhost:3000/api/search',
        {
            method:'post',
            body:JSON.stringify({email: email}),
            headers: { 'Content-Type': 'application/json' },
            mode: "cors"
        })
        // console.log(Existinguser)

        if (Existinguser.status == 404){
            throw new Error('User does not exist!');
        }

        const data = await Existinguser.json()

        const isEqual = await bcrypt.compare(password, data.user.password);
        if(!isEqual){
            throw new Error('Password incorrect!');
        }
        const token = jwt.sign({userId: data.user.id, email: data.user.email},JWTSECRET,{
            expiresIn: '2h'
        });
        return {
            userId : data.user._id,
            token : token,
            tokenExpiration : 2
        }
   }
};