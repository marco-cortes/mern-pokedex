import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { pokemonReducer } from "./pokemonReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    pokemon: pokemonReducer
})