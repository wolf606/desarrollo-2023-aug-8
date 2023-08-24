const multer = require("multer");

function arrayHandler(req, res, next, storageLoc, key) {
    const upload = multer({ dest: storageLoc }).array(key);

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.debug("Multer invalid key");
            return res.status(400).send({ error: "Cannot find key ("+key+") in request." });
        } else if (err) {
            console.debug("Multer error: ", err);
            return res.status(500).send({ error: err });
        }
        next();
    });
}

function singleHandler(req, res, next, storageLoc, key) {
    const upload = multer({ dest: storageLoc }).single(key);

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.debug("Multer invalid key");
            return res.status(400).send({ error: "Cannot find key ("+key+") in request." });
        } else if (err) {
            console.debug("Multer error: ", err);
            return res.status(500).send({ error: err });
        }
        next();
    });
}

module.exports = {
    arrayHandler,
    singleHandler
}