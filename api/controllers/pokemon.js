const Pokemon = require("../models/Pokemon");


const getPokemons = async (req, res) => {
    try {
        const allPokemons = await Pokemon.find();

        res.json({
            ok: true,
            pokemons: allPokemons
        });

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
}

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;

        const pokemon = await Pokemon.findById(id);

        res.json({
            ok: true,
            pokemon
        });
    
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
}

const addPokemon = async (req, res) => {
    try {
        const pokemon = new Pokemon(req.body);
        const pokemonSaved = await pokemon.save();

        res.json({
            ok: true,
            pokemon: pokemonSaved
        });
    
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
}

const updatePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const newPokemon = req.body;
        const oldPokemon = await Pokemon.findById(id);
        const pokemonUpdated= await oldPokemon.updateOne(newPokemon);

        res.json({
            ok: true,
            pokemon: pokemonUpdated
        });
    
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error en el servidor",
        });
    }
}

module.exports = {
    getPokemons,
    getPokemonById,
    addPokemon,
    updatePokemon
}