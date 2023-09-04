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
        newPics.$push = { photos: { $each: pics } };
    }
    if (req.body.active !== undefined) dict.active = req.body.active;
    if (req.body.category !== undefined) dict.category = req.body.category;

    Service.findByIdAndUpdate(
        { _id: params.id }, 
        {
            $set: dict,
            ...newPics
        }, 
        { new: true }
    ).then((ser) => {
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

async function destroy(req, res) {
    const params = req.params;
    Service.findByIdAndDelete({ _id: params.id })
    .then((ser) => {
        if (ser === null) {
            res.status(404).send({ error: "Service not found." });
        } else {
            res.status(200).send(ser);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot delete Service. Reason: "});
        console.debug(err);
    });
}

async function wipe(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.id !== undefined) dict._id = req.body.id;
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.description !== undefined) dict.description = req.body.description;
    if (req.body.active !== undefined) dict.active = req.body.active;
    if (req.body.category !== undefined) dict.category = req.body.category;
    
    if (dict !== null && Object.keys(dict).length > 0){
        Service.deleteMany(dict)
        .then((ser) => {
            if (ser === null) {
                res.status(404).send({ error: "Services not found." });
            } else {
                res.status(200).send(ser);
            }
        })
        .catch((err) => {
            res.status(422).send({ error: "Cannot delete Services. Reason: "});
            console.debug(err);
        });
    } else {
        res.status(422).send({ error: "Cannot delete services. No params were sent."});
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    wipe
}