const { buildSchema } = require('graphql');           //COnstructor de schema GraphQL

module.exports = buildSchema(`

type Dem{
    _id : ID!
    fecha : String!
    demanda : String!
}

type User{
    _id : ID!
    displayName : String!
    email : String!
    password: String
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int! 
}

input InputUser{
    displayName : String!
    email : String!
    password: String!
}

type RootQuery{
    demandassemana: [Dem!]!
    demandaprediccion: [Dem!]!
    demandahoy : [Dem!]!
    login(email: String!, password: String!) : AuthData!
    nuevodia: [Dem!]!
}

type RootMutation{
    createUser(userInput: InputUser) : User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);