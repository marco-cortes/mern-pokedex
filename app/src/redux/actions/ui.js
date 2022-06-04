import { types } from "../types"

export const showModal = () => {
    return {
        type: types.showModal,
        payload: true
    }
}

export const closeModal = () => {
    return {
        type: types.hideModal,
        payload: false
    }
}