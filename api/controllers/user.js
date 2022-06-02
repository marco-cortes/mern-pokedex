const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { generateJWT } = require("../helpers/jwt");

const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.json({
        ok: true,
        user
    });
}

const registerUser = async (req, res) => {

    const exists = await User.findOne({ email: req.body.email });

    if (exists) {
        return res.status(400).json({
            ok: false,
            message: "El correo ya ha sido registrado."
        });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    const u = await user.save();
    const token = await generateJWT(u._id, u.name);

    res.json({
        ok: true,
        user: {
            _id: u._id,
            name: u.name,
            email: u.email
        },
        token: token
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            ok: false,
            message: "Correo no registrado."
        });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            message: "Contraseña incorrecta."
        });
    }

    const token = await generateJWT(user._id, user.name);

    res.json({
        ok: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token: token
    });
}

const renewToken = async (req, res) => {
    const { _id } = req;

    const user = await User.findById(_id);

    const token = await generateJWT(_id, user.name);

    res.json({
        ok: true,
        user: {
            _id,
            name: user.name,
            email: user.email
        },
        token
    });
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    const oldUser = await User.findById(id);
    await oldUser.updateOne(newUser);

    res.json({
        ok: true,
        user: oldUser
    });
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    await user.deleteOne();

    res.json({
        ok: true,
        user
    });
}

module.exports = {
    getUserById,
    registerUser,
    login,
    renewToken,
    updateUser,
    deleteUser
}