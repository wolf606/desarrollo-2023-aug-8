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

async function update(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.active !== undefined) dict.active = req.body.active;

    Category.findByIdAndUpdate({ _id: params.id }, dict, { new: true })
    .then((cat) => {
        if (cat === null) {
            res.status(404).send({ error: "Category not found." });
        } else {
            res.status(200).send(cat);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot update Category. Reason: "});
        console.debug(err);
    });
}

async function destroy(req, res) {
    const params = req.params;
    Category.findByIdAndDelete({ _id: params.id })
    .then((cat) => {
        if (cat === null) {
            res.status(404).send({ error: "Category not found." });
        } else {
            res.status(200).send(cat);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot delete Category. Reason: "});
        console.debug(err);
    });
}

async function wipe(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.id !== undefined) dict._id = req.body.id;
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.active !== undefined) dict.active = req.body.active;
    
    if (dict !== null && Object.keys(dict).length > 0){
        Category.deleteMany(dict)
        .then((cat) => {
            if (cat === null) {
                res.status(404).send({ error: "Categories not found." });
            } else {
                res.status(200).send(cat);
            }
        })
        .catch((err) => {
            res.status(422).send({ error: "Cannot delete Categories. Reason: "});
            console.debug(err);
        });
    } else {
        res.status(422).send({ error: "Cannot delete categories. No params were sent."});
    }
}

module.exports = {
    store,
    show,
    index,
    update,
    destroy,
    wipe
}