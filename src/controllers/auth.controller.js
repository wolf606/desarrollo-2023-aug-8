const { createAccessToken} = require("../utils/jwt");
const { comparePassword } = require("../utils/pwd");
const User = require("../models/user.model");

async function signIn(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    
    User.findOne({ email: email }, 'password role active')
    .then(async (user) => {
        console.debug(user);
        comparePassword(password, user.password)
        .then(async (match) => {
            if (match) {
                if (user.active) {
                    const token = await createAccessToken(user);
                    res.status(200).send({ accessToken: token });
                } else {
                    res.status(401).send({ error: {active: false} });
                }
            } else {
                res.status(401).send({ error: "Password does not match." });
            }
        })
        .catch((err) => {
            res.status(500).send({ error: "Cannot compare passwords." });
            console.debug(err);
        });
    })
    .catch((err) => {
        res.status(500).send({ error: "DB error." });
        console.debug(err);
    });
};

module.exports = {
    signIn,
};