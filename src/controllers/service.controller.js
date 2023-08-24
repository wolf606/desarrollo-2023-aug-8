const Service = require("../models/service.model");

async function uploadFiles(req, res) {
    console.log("body: ",req.body);
    console.log("gallery: ", req.files);
    res.json({message: "service"});
}

async function index(req, res) {
    Service.find()
    .then((serv) => {
        res.status(200).send(serv);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find users. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    Service.findById({ _id: params.id })
    .then((ser) => {
        if (ser === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(ser);
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
    dict.description = req.body.description;
    dict.active = true;
    const arrayOfObjects = req.files;
    if (req.files !== undefined) {
        const filenamesArray = arrayOfObjects.map(obj => obj.filename);
        dict.photos = filenamesArray;
    } 
    dict.category = req.body.category;
    new Service(dict)
    .save()
    .then((service) => {
        res.status(201).send(service);
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
    index,
    show,
    store
}