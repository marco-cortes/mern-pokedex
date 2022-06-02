import { types } from "../types";

const initialState = {
    showModal: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.showModal:
            return {
                ...state,
                showModal: true
            }
        case types.hideModal:
            return {
                ...state,
                showModal: false
            }
        default:
            return state;
    }
}