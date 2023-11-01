const City = require('../models/city.model');
const { cityResource } = require('../resources/city.resource');

const index = async (req, res) => {
    City.find()
    .then((cities) => {
        res.status(200).send(cityResource(cities));
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find cities. Reason: ", err});
        console.debug(err);
    });
}

const show = async (req, res) => {
    const params = req.params;
    City.findById({ _id: params.id })
    .then((city) => {
        if (city === null) {
            res.status(404).send({ error: "City not found." });
        } else {
            res.status(200).send(cityResource(city));
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. ", err});
        console.debug(err);
    });
};

module.exports = {
    index,
    show,
};