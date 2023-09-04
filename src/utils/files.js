const { HOST_IP, HOST_PORT } = require("../../config");
const fs = require('fs');

function getFullPath(filePath) {
    return `https://${HOST_IP}:${HOST_PORT}/${filePath}`;
};

function getFileData(name, path) {
    if (fs.existsSync(`${path}/${name}`)) {
        try {
            const file = fs.createReadStream(`${path}/${name}`);
            return file;
        } catch (err) {
            console.debug("Error in files utils method getFileData: ", err);
        }
    }
    return null;
}

module.exports = {
    getFullPath,
    getFileData
}