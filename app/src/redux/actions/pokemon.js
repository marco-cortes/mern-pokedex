import Swal from "sweetalert2";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types";

export const savePokemon = (pokemon) => {
    return async (dispatch, getState) => {
        dispatch(loading());
        const { user } = getState().auth;
        pokemon.user = user._id;

        if(pokemon._id) {
            const response = await authFetch("pokemon/update/" + pokemon._id, pokemon, "PUT");
            const data = await response.json();
            if(!data.ok) {
                return Swal.fire({
                    title: "Error!",
                    text: data.message,
                    icon: "error"
                });
            }

            
            dispatch(setPokemon(data.pokemon));
            return Swal.fire({
                title: "Success!",
                text: "Pokemon updated.",
                icon: "success"
            });
        }


        const res = await authFetch("pokemon/new", pokemon, "POST");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.message
            })
        }
        dispatch(addPokemon(body.pokemon));
        dispatch(setPokemon({
            stats: {}
        }));
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Pokemon added successfully"
        });
    }
}

export const getPokemons = () => {
    return async (dispatch, getState) => {
        dispatch(loading());
        const res = await authFetch(`pokemon/`, {}, "GET");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.message
            })
        }

        const pokemons = body.pokemons;

        const allPokemons = await Promise.all(
            pokemons.map(async pokemon => {
                const resp = await authFetch(`user/get/${pokemon.user}`, null, "GET");
                const bodyp = await resp.json();
                if (bodyp.error) {
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: bodyp.error
                    })
                }
                pokemon.user = bodyp.user;
                return pokemon;
            })
        );

        dispatch(setAllPokemons(allPokemons));
    }
}

export const getMyPokemons = () => {
    return async (dispatch, getState) => {
        dispatch(loading());
        const { user } = getState().auth;

        const res = await authFetch(`pokemon/user/${user._id}`, null, "GET");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.message
            })
        }

        const pokemons = body.pokemons;
        const allPokemons = await Promise.all(
            pokemons.map(async pokemon => {
                const resp = await authFetch(`user/get/${pokemon.user}`, null, "GET");
                const bodyp = await resp.json();
                if (!bodyp.ok) {
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: bodyp.message
                    })
                }
                pokemon.user = bodyp.user;
                return pokemon;
            })
        );

        dispatch(setPokemons(allPokemons));
    }
}

export const getPokemon = (id) => {
    return async (dispatch, getState) => {
        dispatch(loading());
        const res = await authFetch(`pokemon/get/${id}`, null, "GET");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.message
            })
        }
        dispatch(setPokemon(body.pokemon));
    }
}

export const getPokemonData = (id) => {
    return async (dispatch, getState) => {
        dispatch(loading());
        const res = await authFetch(`pokemon/get/${id}`, null, "GET");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.message
            })
        }

        const pokemon = body.pokemon;

        const resp = await authFetch(`user/get/${pokemon.user}`, null, "GET");
        const bodyp = await resp.json();
        if (!bodyp.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: bodyp.message
            })
        }
        pokemon.user = bodyp.user;

        dispatch(setPokemon(pokemon));
    }
}

export const resetPokemon = () => {
    return {
        type: types.loadPokemon,
        payload: {
            stats: {}
        }
    }
}

const addPokemon = (pokemon) => {
    return {
        type: types.addPokemon,
        payload: pokemon
    }
}

const setPokemon = (pokemon) => {
    return {
        type: types.loadPokemon,
        payload: pokemon
    }
}

const setPokemons = (pokemons) => {
    return {
        type: types.loadMyPokemons,
        payload: pokemons
    }
}

const setAllPokemons = (pokemons) => {
    return {
        type: types.loadPokemons,
        payload: pokemons
    }
}

const loading = () => {
    return {
        type: types.loading
    }
}