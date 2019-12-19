const { Router } = require('express');
const pokemons = require('../../data/pokedex.json');

const api = Router();

api.get('/', (rep, res) => {
    res.json({ pokemons });
})

module.exports = api;