const Category = require("../models/category.model");

async function index(req, res) {
    Category.find()
    .then((cat) => {
        res.status(200).send(cat);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find categories. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    Category.findById({ _id: params.id })
    .then((cat) => {
        if (cat === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(cat);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. "});
        console.debug(err);
    });
}

async function store(req, res) {
    var dict = {};
    dict.name = req.body.name;
    dict.active = true;
    new Category(dict)
    .save()
    .then((cat) => {
        res.status(201).send(cat);
    }
    )
    .catch((err) => {
        res.status(500).send({ error: "Server cannot store user."});
        console.debug(err);
    }
    );
};

module.exports = {
    store,
    show,
    index
}