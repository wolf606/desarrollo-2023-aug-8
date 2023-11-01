const { resource } = require("./resource");

const cityResource = (data) => {
    return resource(data, (data) => {
        return {
            id: data._id,
            name: data.name,
            code: data.code,
            stateCode: data.stateCode,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });
}

module.exports = { cityResource };