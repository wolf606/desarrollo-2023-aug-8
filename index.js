const mongoose = require("mongoose");
const fs = require('fs');
const app = require("./app")

const { 
    API_VERSION,
    HOST_IP,
    HOST_PORT
} = require("./config");

const { 
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, 
    DB_SERVER_IP, 
    DB_PORT 
} = require("./config");

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_SERVER_IP}/?retryWrites=true&w=majority`;
/*Local DB URI
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER_IP}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
*/
const folderName = './uploads';

async function createUploadsDir() {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        if (!fs.existsSync(folderName+"/avatar")) {
            fs.mkdirSync(folderName+"/avatar");
        }
        if (!fs.existsSync(folderName+"/service")) {
            fs.mkdirSync(folderName+"/service");
        }
      } catch (err) {
        console.error(err);
      }
}

async function connectToDatabase() {
    console.debug("Mongo Cluster: ", DB_URI);
    mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log("Connected to MongoDB database");
            app.listen(HOST_PORT, () => {
                console.log("Server running on: ");
                console.log(`   http://${HOST_IP}:${HOST_PORT}/api/${API_VERSION}/`)
            });
        }
    )
    .catch(
        (err) => {
            console.log("Cannot connect to cluster. Log: ", err)
        }
    )
};

connectToDatabase().catch(console.error);
createUploadsDir();