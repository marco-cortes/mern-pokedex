import { types } from "../types";

const initialState = {
    pokemons: [],
    pokemon: {},
    loading: false,
    error: null
}

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadPokemons:
            return {
                ...state,
                loading: false,
                pokemons: action.payload
            }
        case types.loadPokemon:
            return {
                ...state,
                loading: false,
                pokemon: action.payload
            }
        case types.savePokemon:
            return {
                ...state,
                loading: false,
                pokemons: [action.payload, ...state.pokemons]
            }
        case types.error:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.loading:
            return {
                ...state,
                loading: true
            }
        case types.clearAll:
            return initialState;
        default:
            return state;
    }
}