const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { generateJWT } = require("../helpers/jwt");

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return res.json({
                ok: false,
                message: "Id not found"
            })

        const user = await User.findById(id);

        if (!user)
            return ({
                ok: false,
                message: "User not found"
            })

        res.json({
            ok: true,
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                photo: user.photo,
            }
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const exists = await User.findOne({ email: req.body.email });

        if (exists) {
            return res.status(400).json({
                ok: false,
                message: "Email registred."
            });
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        const u = await user.save();
        const token = await generateJWT(u._id, u.name);

        u.password = "";

        res.json({
            ok: true,
            user: u,
            token: token
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "User not found."
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "Invalid password."
            });
        }

        const token = await generateJWT(user._id, user.name);

        user.password = "";

        res.json({
            ok: true,
            user: user,
            token: token
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

const renewToken = async (req, res) => {
    try {
        const { _id } = req;

        const user = await User.findById(_id);

        const token = await generateJWT(_id, user.name);

        user.password = "";

        res.json({
            ok: true,
            user,
            token
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id)
            return res.json({
                ok: false,
                message: "Id not found"
            });

        const newUser = req.body;

        const oldUser = await User.findById(id);

        if (!oldUser)
            return res.json({
                ok: false,
                message: "User not found"
            });

        if (newUser.password) {
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(newUser.password, salt);
        } else {
            newUser.password = oldUser.password;
        }

        await oldUser.updateOne(newUser);

        newUser.password = "";

        res.json({
            ok: true,
            user: newUser
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return res.json({
                ok: false,
                message: "Id not found"
            })

        const user = await User.findById(id);

        if (!user)
            return res.json({
                ok: false,
                message: "User not found"
            })

        await user.deleteOne();

        res.json({
            ok: true,
            user
        });
    } catch (e) {
        res.json({
            ok: false,
            message: "Error in server",
        })
    }
}

module.exports = {
    getUserById,
    registerUser,
    login,
    renewToken,
    updateUser,
    deleteUser
}