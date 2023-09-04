const Customer = require("../models/customer.model");
const { getFullPath } = require("../utils/files");

async function index(req, res) {
    Customer.find()
    .then((cust) => {
        res.status(200).send(cust);
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find customers. Reason: "});
        console.debug(err);
    });
};

async function show(req, res) {
    const params = req.params;
    Customer.findById({ _id: params.id })
    .then((cus) => {
        if (cus === null) {
            res.status(404).send({ error: "Customer not found." });
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
    if (req.file) {
        const filePic = req.file;
        const avatar = {
            url: getFullPath(filePic.path),
            mimetype: filePic.mimetype
        };
        dict.avatar = avatar;
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

async function update(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.email !== undefined) dict.email = req.body.email;
    if (req.body.active !== undefined) dict.active = req.body.active;
    if (req.file) {
        const filePic = req.file;
        const avatar = {
            url: getFullPath(filePic.path),
            mimetype: filePic.mimetype
        };
        dict.avatar = avatar;
    }
    Customer.findByIdAndUpdate({ _id: params.id }, dict, { new: true })
    .then((cus) => {
        if (cus === null) {
            res.status(404).send({ error: "Customer not found." });
        } else {
            res.status(200).send(cus);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot update Customer. Reason: "});
        console.debug(err);
    });
}

async function destroy(req, res) {
    const params = req.params;
    Customer.findByIdAndDelete({ _id: params.id })
    .then((cus) => {
        if (cus === null) {
            res.status(404).send({ error: "Customer not found." });
        } else {
            res.status(200).send(cus);
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot delete Customer. Reason: "});
        console.debug(err);
    });
}

async function wipe(req, res) {
    const params = req.params;
    var dict = {};
    if (req.body.id !== undefined) dict._id = req.body.id;
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.email !== undefined) dict.email = req.body.email;
    if (req.body.active !== undefined) dict.active = req.body.active;
    
    if (dict !== null && Object.keys(dict).length > 0){
        Customer.deleteMany(dict)
        .then((cus) => {
            if (cus === null) {
                res.status(404).send({ error: "Customer not found." });
            } else {
                res.status(200).send(cus);
            }
        })
        .catch((err) => {
            res.status(422).send({ error: "Cannot delete Customers. Reason: "});
            console.debug(err);
        });
    } else {
        res.status(422).send({ error: "Cannot delete customers. No parameters were sent."});
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