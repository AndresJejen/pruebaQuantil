// Dependencias
const express = require('express');                   //Importación framework express
const bodyparser = require('body-parser');            //Parser de Json
const graphQLHttp = require('express-graphql');       //Express + Graphql Middleware

//Importa el modulo de configuraciones globales
const config = require('../config');                   

//schemas y resolvers GraphQL
const GraphQLschemas = require('./graphql/schemas');
const GraphQLresolvers = require('./graphql/resolvers');

//valores de app
const app = express();

// MiddleWares
app.use(bodyparser.json());

const isAuth = require('./middlewares/is_Auth');
app.use(isAuth);

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');

    if(req.method === 'OPTIONS' ){
        return res.sendStatus(200);
    }
    next();
});

//rutas
app.use('/api',graphQLHttp({
    schema: GraphQLschemas,
    rootValue: GraphQLresolvers,
    graphiql: true
}));

app.listen(config.port,()=>{
    console.log(`Servidor corriendo en puerto 8000`)
});


