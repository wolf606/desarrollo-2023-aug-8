const Customer = require("../models/customer.model");

async function uploadFiles(req, res) {
    console.log("body: ",req.body);
    console.log("avatar: ", req.file);
    res.json({message: "customer"});
}

async function index(req, res) {
    Customer.find()
    .then((cust) => {
        res.status(200).send(cust);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find users. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    Customer.findById({ _id: params.id })
    .then((cus) => {
        if (cus === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(cus);
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
    dict.email = req.body.email;
    dict.active = true;
    if (req.file !== undefined) {
        dict.avatar = req.file.filename;
    } 
    new Customer(dict)
    .save()
    .then((cust) => {
        res.status(201).send(cust);
    }
    )
    .catch((err) => {
        res.status(500).send({ error: "Server cannot store user."});
        console.debug(err);
    }
    );
};

module.exports = {
    uploadFiles,
    store,
    show,
    index
}