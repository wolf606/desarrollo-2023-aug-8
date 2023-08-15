const User = require("../models/user.model");
const { hashPassword } = require("../utils/pwd");

async function index(req, res) {
    User.find()
    .then((users) => {
        res.status(200).send(users);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find users. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    User.findById({ _id: params.id })
    .then((user) => {
        if (user === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(user);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. "});
        console.debug(err);
    });
}

async function store(req, res) {
    const { name, lastname, email, password } = req.body;
    console.debug("Password in plain text: ", password);
    hashPassword(password)
    .then((hash) => {
        console.debug("Hashed password: ", hash);
        new User({
            name,
            lastname,
            email,
            password: hash,
            active: true
        })
        .save()
        .then((user) => {
            console.debug("User created: ", user);
            res.status(201).send(user);
        }
        )
        .catch((err) => {
            res.status(500).send({ error: "Server cannot store user."});
            console.debug(err);
        }
        );
    })
    .catch((err) => {
        res.status(500).send({ error: "Server cannot hash password."});
        console.debug(err);
    });
};

async function update(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.lastname !== undefined) dict.lastname = req.body.lastname;
    if (req.body.email !== undefined) dict.email = req.body.email;
    if (req.body.password !== undefined) {
        hashPassword(req.body.password)
        .then((hash) => {
            dict.password = hash;
        })
        .catch((err) => {
            res.status(500).send({ error: "Server cannot hash password."});
            console.debug(err);
            return;
        });
    }
    if (req.body.active !== undefined) dict.active = req.body.active;
    
    User.findByIdAndUpdate({ _id: params.id }, dict, { new: true })
    .then((user) => {
        if (user === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(user);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot update User. Reason: "});
        console.debug(err);
    });
}

async function destroy(req, res) {
    const params = req.params;
    User.findByIdAndDelete({ _id: params.id })
    .then((user) => {
        if (user === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(user);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot delete User. Reason: "});
        console.debug(err);
    });
}

async function wipe(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.id !== undefined) dict._id = req.body.id;
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.lastname !== undefined) dict.lastname = req.body.lastname;
    if (req.body.email !== undefined) dict.email = req.body.email;
    
    if (dict !== null && Object.keys(dict).length > 0){
        User.deleteMany(dict)
        .then((user) => {
            if (user === null) {
                res.status(404).send({ error: "User not found." });
            } else {
                res.status(200).send(user);
            }
        })
        .catch((err) => {
            res.status(422).send({ error: "Cannot delete User. Reason: "});
            console.debug(err);
        });
    } else {
        res.status(422).send({ error: "Cannot delete users."});
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
    wipe
}