import { authFetch, noAuthFetch } from "../../helpers/fetch"
import { types } from "../types";
import Swal from "sweetalert2";
import { uploadProfilePhoto } from "../../helpers/upload";


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
        const res = await authFetch("user/save/" + user._id, user, "PUT");
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

        Swal.fire({
            title: "Success",
            text: "Your profile has been updated",
            icon: "success",
        })
    }
}

export const updatePassword = (user, newPassword) => {
    return async (dispatch) => {

        const res = await noAuthFetch("user/login", { email: user.email, password: user.password }, "POST");
        const body = await res.json();

        if (!body.ok) {
            //mostrar error
            return Swal.fire({
                title: "Error",
                text: "The old password is incorrect",
                icon: "error",
            })
        }

        user.password = newPassword;

        const resp = await authFetch("user/save/" + user._id, user, "PUT");
        const bodyp = await resp.json();

        if (!bodyp.ok) {
            //mostrar error
            return Swal.fire({
                title: "Error",
                text: bodyp.message,
                icon: "error",
            })
        }

        Swal.fire({
            title: "Success",
            text: "Your password has been updated",
            icon: "success",
        })
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

export const startUploadPhoto = (user, photo) => {
    return async (dispatch) => {
        const url = await uploadProfilePhoto(user, photo);
        user.photo = url;
        dispatch(saveUser(user));
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