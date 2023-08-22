const { decodeToken } = require("../utils/jwt");
const User = require("../models/user.model");

async function ensureAuth(req, res, next) {
  if (!req.headers.authorization) { 
    res.status(401).send({ error: "Unauthenticated" });
  } else {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    decodeToken(token)
    .then((payload) => {
      User.findOne({ _id: payload.id }, 'active')
      .then((user) => {
        if (user !== null) {
          if (user.active === false) {
            res.status(403).send({ 
              error: {
                  active : user.active
              }
            });
          } else {
            req.user = payload;
            next();
          }
        } else {
          res.status(404).send({ error: "User not found when ensureAuth." });
        }
      })
      .catch((err) => {
        res.status(401).send({ error: "Error finding existing user in ensureAuth." });
      });
    })
    .catch((err) => {
      res.status(401).send({ error: "Expired or Invalid token" });
    })
  }
};

async function getAuthenticatedUser(token) {
  return new Promise((resolve, reject) => {
    decodeToken(token)
    .then((payload) => {
      User.findOne({ _id: payload.id }, 'email active role')
      .then(
        (user) => {
          if (user === null) {
            return reject({ error: "User not found. user: ", user });
          } else {
            return resolve(user);
          }
        }
      )
      .catch((err) => {
        return reject(err);
      });
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

module.exports = {
  ensureAuth,
  getAuthenticatedUser
};