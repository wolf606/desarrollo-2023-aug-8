const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");
const Address = require("../models/address.model");

const validateUserStore = [
    check("name", "name field is required").exists(),
    check("name", "name field must be a string").isString(),
    check("name", "name field cannot be empty").not().isEmpty(),

    check("lastname", "lastname field is required").exists(),
    check("lastname", "lastname field must be a string").isString(),
    check("lastname", "lastname field cannot be empty").not().isEmpty(),

    check("email", "email field is required").exists(),
    check("email", "email field must be a string").isString(),
    check("email", "email field cannot be empty").not().isEmpty(),
    check("email", "email field has no valid value.").isEmail(),
    check("email").custom(
        async (value, { req, loc, path }) => {
            try {
                const user = await User.exists({ email: req.body.email })
                if (user !== null) {
                    return Promise.reject("email is already registered");
                }
            } catch (error) {
                // Handle the error
                console.error("An error occurred:", error);
                // You can choose to return a rejection or handle the error differently
                return Promise.reject("DB error");
            }
        }
    ),
    check("email").custom(
        (value, { req, loc, path }) => {
            //Check if email is from a valid domain
            if (value.split("@")[1] !== "autonoma.edu.co") {
                throw new Error("email is not from a valid domain.");
            } else {
                return value;
            }
        }
    ),

    check("password", "password field is required").exists(),
    check("password", "password field must be a string").isString(),
    check("password", "password field cannot be empty").not().isEmpty(),
    check("password", "password field needs 6 or more characters").isLength({ min: 6 }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserUpdate = [
    check("id", "id field must be a valid ObjectId").isMongoId(),

    check("name", "name field is required").exists().optional(),
    check("name", "name field must be a string").isString().optional(),
    check("name", "name field cannot be empty").not().isEmpty().optional(),

    check("lastname", "lastname field is required").exists().optional(),
    check("lastname", "lastname field must be a string").isString().optional(),
    check("lastname", "lastname field cannot be empty").not().isEmpty().optional(),

    check("email", "email field must be a string").isString().optional(),
    check("email", "email field cannot be empty").not().isEmpty().optional(),
    check("email", "email field has no valid value.").isEmail().optional(),
    check("email").custom(
        async (value, { req, loc, path }) => {
            try {
                const user = await User.exists({ email: req.body.email })
                if (user !== null) {
                    return Promise.reject("email is already registered");
                }
            } catch (error) {
                // Handle the error
                console.error("An error occurred:", error);
                // You can choose to return a rejection or handle the error differently
                return Promise.reject("DB error");
            }
        }
    ).optional(),
    check("email").custom(
        (value, { req, loc, path }) => {
            //Check if email is from a valid domain
            if (value.split("@")[1] !== "autonoma.edu.co") {
                throw new Error("email is not from a valid domain.");
            } else {
                return value;
            }
        }
    ).optional(),

    check("password", "password field must be a string").isString().optional(),
    check("password", "password field cannot be empty").not().isEmpty().optional(),
    check("password", "password field needs 6 or more characters").isLength({ min: 6 }).optional(),

    check("active", "active field must be a boolean").isBoolean().optional(),

    check("addressId", "addressId field must be a valid ObjectId").isMongoId().optional(),
    check("addressId").custom(
        async (value, { req, loc, path }) => {
            try {
                const addr = await Address.exists({ _id: req.body.addressId })
                if (addr === null) {
                    return Promise.reject("Address is not registered");
                }
            } catch (error) {
                // Handle the error
                console.error("An error occurred:", error);
                // You can choose to return a rejection or handle the error differently
                return Promise.reject("DB error");
            }
        }
    ).optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserShow = [
    check("id", "id field must be a valid ObjectId").isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserDestroy = [
    check("id", "id field must be a valid ObjectId").isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUserStore,
    validateUserUpdate,
    validateUserShow,
    validateUserDestroy
}