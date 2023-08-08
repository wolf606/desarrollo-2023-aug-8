const Address = require("../models/address.model");

async function index(req, res) {
    Address.find()
    .then((addresses) => {
        res.status(200).send(addresses);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find addresses. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    Address.findById({ _id: params.id })
    .then((adress) => {
        if (adress === null) {
            res.status(404).send({ error: "adress not found." });
        } else {
            res.status(200).send(adress);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. "});
        console.debug(err);
    });
}

async function store(req, res) {
    const { country, state, city, address } = req.body;
    new Address({
        country, 
        state, 
        city, 
        address
    }).save()
    .then((address) => {
        res.status(201).send(address);
    }
    )
    .catch((err) => {
        res.status(500).send({ error: "Server cannot store address."});
        console.debug(err);
    }
    );
};

module.exports = {
    store,
    index,
    show
}