const Service = require("../models/service.model");
const { getFullPath } = require("../utils/files");

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
    if (req.files && Array.isArray(req.files)) {
        const pics = req.files.map(
            (img) => {
                const picPath = img.path;
                return {
                    url: getFullPath(picPath),
                    mimetype: img.mimetype
                };
            }
        );
        dict.photos = pics;
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

async function update(req, res) {
    const params = req.params;
    var dict = {};
    var newPics = {};
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.description !== undefined) dict.description = req.body.description;
    if (req.files && Array.isArray(req.files)) {
        const pics = req.files.map(
            (img) => {
                const picPath = img.path;
                return {
                    url: getFullPath(picPath),
                    mimetype: img.mimetype
                };
            }
        );
        newPics.pics = pics;
    }
    console.debug("picsA: ", newPics.pics);
    if (req.body.active !== undefined) dict.active = req.body.active;
    if (req.body.category !== undefined) dict.category = req.body.category;

    Service.findByIdAndUpdate({ _id: params.id }, {dict, $push: { $each: newPics.pics }}, { new: true })
    .then((ser) => {
        if (ser === null) {
            res.status(404).send({ error: "User not found." });
        } else {
            res.status(200).send(ser);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot update User. Reason: "});
        console.debug(err);
    });
}

module.exports = {
    index,
    show,
    store,
    update
}