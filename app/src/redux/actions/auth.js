import { authFetch, noAuthFetch } from "../../helpers/fetch"
import { types } from "../types";
import Swal from "sweetalert2";


export const login = (email, password) => {
    return async (dispatch) => {
        const res = await noAuthFetch("user/login", { email, password }, "POST");
        const body = await res.json();
        if (!body.ok) {
            //mostrar error
            return Swal.fire({
                title: "Error",
                text: body.message,
                icon: "error",
            })
        }

        const { user, token } = body;
        localStorage.setItem("token", token);
        dispatch(setUser(user));
    }
}

export const register = (name, lastName, email, password) => {
    return async (dispatch) => {
        const res = await noAuthFetch("user/register", { name, lastName, email, password }, "POST");
        const body = await res.json();

        if (!body.ok) {
            //mostrar error
            return Swal.fire({
                title: "Error",
                text: body.message,
                icon: "error",
            })
        }

        const { user, token } = body;

        localStorage.setItem("token", token);
        dispatch(setUser(user));
    }
}

export const saveUser = (user) => {
    return async (dispatch) => {
        const res = await noAuthFetch("user/save", user, "PUT");
        const body = await res.json();

        if (!body.ok) {
            //mostrar error
            return Swal.fire({
                title: "Error",
                text: body.message,
                icon: "error",
            })
        }

        const { user: newUser } = body;

        dispatch(setUser(newUser));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token");
        dispatch(logout());
    }
}

export const startCheckingAuth = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(setLoading(false));
            return;
        }

        const res = await authFetch("user/check", {});
        const body = await res.json();

        if (!body.ok) {
            dispatch(setLoading(false));
            return;
        }

        const { user } = body;
        dispatch(setUser(user));
    }
}

const logout = () => {
    return {
        type: types.logout
    }
}

const setUser = (user) => {
    return {
        type: types.setUser,
        payload: user
    }
}

const setLoading = (loading) => {
    return {
        type: types.loading,
        payload: loading
    }
}