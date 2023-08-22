const { resource } = require("./resource");

const addressResource = (data) => {
    return resource(data, (data) => {
        return {
            id: data._id,
            country: data.country,
            state: data.state,
            city: data.city,
            address: data.address,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });
}
module.exports = { addressResource };