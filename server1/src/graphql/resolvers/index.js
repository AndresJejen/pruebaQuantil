//Resolvers 
const usersResolver = require('./users');
const dataResolver = require('./data')

const rootResolver = {
    ...usersResolver,
    ...dataResolver
};

module.exports = rootResolver;


