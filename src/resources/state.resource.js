const { resource } = require("./resource");

const stateResource = (data) => {
    return resource(data, (data) => {
        return {
            id: data._id,
            name: data.name,
            code: data.code,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });
}

module.exports = { stateResource };