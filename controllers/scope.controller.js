const {Scope} = require('../models');

exports.createScope = async (req, res, next) => {
    try {
        let scope = new Scope(req.body);
        scope = await scope.save();
        res.status(200).send(scope);
    } catch (error) {
        next(error);
    }
}

exports.updateScope = async (req, res, next) => {
    try {
        throw new Error("this is sample 2 ")
    } catch (error) {
        next(error);
    }
}
exports.getScopes = async (req, res, next) => {
    try {
        let scopes = await Scope.find();
        res.send(scopes);
    } catch (error) {
        next(error);
    }
}