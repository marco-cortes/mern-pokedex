const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { generateJWT } = require("../helpers/jwt");

const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.json({
        ok: true,
        user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            photo: user.photo,
        }
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

    u.password = "";

    res.json({
        ok: true,
        user: u,
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

    user.password = "";

    res.json({
        ok: true,
        user: user,
        token: token
    });
}

const renewToken = async (req, res) => {
    const { _id } = req;

    const user = await User.findById(_id);

    const token = await generateJWT(_id, user.name);

    user.password = "";

    res.json({
        ok: true,
        user,
        token
    });
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;

    const oldUser = await User.findById(id);

    if(newUser.password) {
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