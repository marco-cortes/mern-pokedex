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
        return res.status(500).json({
            ok: false,
            message: "Error in server",
        });
    }
}

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return ({
                ok: false,
                message: "Id not found"
            })

        const pokemon = await Pokemon.findById(id);

        if (!pokemon)
            return res.json({
                ok: false,
                message: "Pokemon not found"
            })

        res.json({
            ok: true,
            pokemon
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error in server",
        });
    }
}

const getPokemonsByUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return ({
                ok: false,
                message: "Id not found"
            })

        const pokemons = await Pokemon.find({ user: id });

        if (!pokemons)
            return ({
                ok: false,
                message: "User not found"
            })

        res.json({
            ok: true,
            pokemons
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
        return res.status(500).json({
            ok: false,
            message: "Error in server",
        });
    }
}

const updatePokemon = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return ({
                ok: false,
                message: "Id not found"
            })

        const newPokemon = req.body;
        const oldPokemon = await Pokemon.findById(id);

        if (!oldPokemon)
            return ({
                ok: false,
                message: "Pokemon not found"
            })

        await oldPokemon.updateOne(newPokemon);

        res.json({
            ok: true,
            pokemon: newPokemon
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
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