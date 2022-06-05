import { types } from "../types";

const initialState = {
    pokemons: [],
    myPokemons: [],
    pokemon: {
        stats :{},
    },
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
        case types.loadMyPokemons:
            return {
                ...state,
                loading: false,
                myPokemons: action.payload
            }
        case types.addPokemon:
            return {
                ...state,
                loading: false,
                myPokemons: [action.payload, ...state.myPokemons]
            }
        case types.updatePokemon:
            return {
                ...state,
                loading: false,
                myPokemons: state.myPokemons.map(pokemon => pokemon._id === action.payload._id ? action.payload : pokemon)
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