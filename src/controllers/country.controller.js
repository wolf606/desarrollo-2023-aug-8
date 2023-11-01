const { countryResource } = require('../resources/country.resource');
const User = require('../models/user.model');
const Country = require('../models/country.model');
const { getAuthenticatedUser } = require('../middleware/user.auth');

const index = async (req, res) => {
    Country.find()
    .then((country) => {
        res.status(200).send(countryResource(country));
    })
    .catch((err) => {
        res.status(422).send({ error: "Cannot find countries. Reason: ", err});
        console.debug(err);
    });
}

const show = async (req, res) => {
    const params = req.params;
    Country.findById({ _id: params.id })
    .then((country) => {
        if (country === null) {
            res.status(404).send({ error: "Country not found." });
        } else {
            res.status(200).send(countryResource(country));
        }
    })
    .catch((err) => {
        res.status(422).send({ error: "findById failed. ", err});
        console.debug(err);
    });
}

const update = async (req, res) => {
    getAuthenticatedUser(req.headers.authorization)
    .then(async (user) => {
        if (user.role === User.Roles.admin) {
            try {
                //Get countries from an API
                const response = await fetch(
                    'https://restcountries.com/v3.1/all'
                    );
                const data = await response.json();
                //Get unique countries
                const uniqueCountries = [];
                data.forEach((item) => {
                    const country = {
                        name: item.name.common,
                        code: item.cca2,
                    };
                    if (
                        !uniqueCountries.find((d) => d.code === country.code)
                    ) {
                        uniqueCountries.push(country);
                    }
                });
                //Save unique countries
                uniqueCountries.forEach((item) => {
                    new Country({
                        name: item.name,
                        code: item.code,
                    })
                    .save()
                });
                res.status(200).send({ message: "Countries saved." });
            } catch (err) {
                res.status(422).send({ error: "Cannot get countries. Reason: ", err});
                console.debug(err);
            }

        } else {
            res.status(403).send({ error: "You are not authorized to create a country." });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "});
        console.debug(err);
    });
};

module.exports = { index, show, update };