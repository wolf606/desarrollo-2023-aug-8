const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        }
    )});
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, check) => {
            if (err) {
                reject(err);
            } else {
                resolve(check);
            }
        }
    )});
}

module.exports = {
    hashPassword,
    comparePassword
}