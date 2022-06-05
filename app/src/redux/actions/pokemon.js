import Swal from "sweetalert2";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types";

export const savePokemon = (pokemon) => {
    return async (dispatch, getState) => {
        const { user } = getState().auth;
        pokemon.user = user._id;

        const res = await authFetch("pokemon/new", pokemon, "POST");
        const body = await res.json();
        if (body.error) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.error
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
        const res = await authFetch(`pokemon/`, {}, "GET");
        const body = await res.json();
        if (body.error) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.error
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
        const { user } = getState().auth;

        const res = await authFetch(`pokemon/user/${user._id}`, null, "GET");
        const body = await res.json();
        if (!body.ok) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: body.error
            })
        }

        const pokemons = body.pokemons;

        if(!pokemons.length <= 0)
            dispatch(setPokemons(pokemons));
        
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

        dispatch(setPokemons(allPokemons));
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