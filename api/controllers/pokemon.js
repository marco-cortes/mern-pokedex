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
            message: "Error in server",
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
            message: "Error in server",
        });
    }
}

const getPokemonsByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const pokemons = await Pokemon.find({ user: id });

        res.json({
            ok: true,
            pokemons
        });
    
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error in server",
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
            message: "Error in server",
        });
    }
}

const updatePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const newPokemon = req.body;
        const oldPokemon = await Pokemon.findById(id);
        await oldPokemon.updateOne(newPokemon);

        res.json({
            ok: true,
            pokemon: newPokemon
        });
    
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            message: "Error in server",
        });
    }
}

module.exports = {
    getPokemons,
    getPokemonById,
    getPokemonsByUser,
    addPokemon,
    updatePokemon
}