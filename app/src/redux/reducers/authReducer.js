import { types } from "../types";

const initialState = {
    loading: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setUser:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case types.logout:
            return initialState;
        case types.loading:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}