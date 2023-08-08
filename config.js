require("dotenv").config();

module.exports = { 
    API_VERSION: "v1",
    SECRET_KEY: process.env.SECRET_KEY,
    HOST_IP: process.env.HOST_IP,
    HOST_PORT: process.env.HOST_PORT, 
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER, 
    DB_PASSWORD: process.env.DB_PASSWORD, 
    DB_SERVER_IP: process.env.DB_SERVER_IP, 
    DB_PORT: process.env.DB_PORT
};