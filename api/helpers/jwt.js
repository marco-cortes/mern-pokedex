const jwt = require("jsonwebtoken");

const generateJWT = (_id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, name };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("Can't generate token");
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT,
}