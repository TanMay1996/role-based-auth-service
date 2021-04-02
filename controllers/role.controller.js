const { Role } = require("../models");

exports.createRole = async (req, res, next) => {
    try {
        let role = await Role.create(req.body);
        res.status(200).send(role);
    } catch (error) {
        next(error);
    }
}

exports.updateRole = async (req, res, next) => {
    try {
        throw new Error("this is sample 2 ")
    } catch (error) {
        next(error);
    }
}
exports.getRoles = async (req, res, next) => {
    try {
        let roles = await Role.find().populate('scopes'); 
        res.status(200).send(roles);

    } catch (error) {
        next(error);
    }
}