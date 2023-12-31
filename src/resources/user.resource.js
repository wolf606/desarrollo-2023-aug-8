const { resource } = require("./resource");
const { addressResource } = require("./address.resource");

const userResource = (data) => {
    return resource(data, (data) => {
        return {
            id: data._id,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            active: data.active,
            role: data.role,
            address: data.address,
            avatar: data.avatar,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });
}

module.exports = { userResource };