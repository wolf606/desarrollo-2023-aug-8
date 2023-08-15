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

async function update(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.country !== undefined) dict.country = req.body.country;
    if (req.body.state !== undefined) dict.state = req.body.state;
    if (req.body.city !== undefined) dict.city = req.body.city;
    if (req.body.address !== undefined) dict.address = req.body.address;
    
    Address.findByIdAndUpdate({ _id: params.id }, dict, { new: true })
    .then((address) => {
        if (address === null) {
            res.status(404).send({ error: "Address not found." });
        } else {
            res.status(200).send(address);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot update Address. Reason: "});
        console.debug(err);
    });
}

async function destroy(req, res) {
    const params = req.params;
    Address.findByIdAndDelete({ _id: params.id })
    .then((address) => {
        if (address === null) {
            res.status(404).send({ error: "Address not found." });
        } else {
            res.status(200).send(address);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot delete Address. Reason: "});
        console.debug(err);
    });
}

async function wipe(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.id !== undefined) dict._id = req.body.id;
    if (req.body.country !== undefined) dict.country = req.body.country;
    if (req.body.state !== undefined) dict.state = req.body.state;
    if (req.body.city !== undefined) dict.city = req.body.city;
    if (req.body.address !== undefined) dict.address = req.body.address;
    
    if (dict !== null && Object.keys(dict).length > 0){
        Address.deleteMany(dict)
        .then((address) => {
            if (address === null) {
                res.status(404).send({ error: "Address not found." });
            } else {
                res.status(200).send(address);
            }
        })
        .catch((err) => {
            res.status(422).send({ error: "Cannot delete Address. Reason: "});
            console.debug(err);
        });
    } else {
        res.status(422).send({ error: "Cannot delete Addresses."});
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