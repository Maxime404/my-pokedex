const { Router } = require('express');
const pokemons = require('./pokemons');

const api = Router();

api.get('/', (rep, res) => {
    res.send('<h1>Hi, welcome to our pokedex API!</h1>');
})

api.use('/pokemons', pokemons);

module.exports = api;