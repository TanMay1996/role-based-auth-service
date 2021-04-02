const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    try {
        let newuser = req.body;
        let defaultRole = await Role.findOne({ role: 'user-basic' });
        newuser.roles = [defaultRole._id];
        let user = await User.create(newuser);
        if (user) {
            res.status(200).send({ message: "User Created!" });
        }
        else {
            throw new Error("User not created!")
        }
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        let user = await User.find().populate([{ path: 'roles', populate: 'scopes' }, 'scopes']);

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

exports.getToken = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({ email }).select('+hashed_password').populate([{ path: 'roles', populate: 'scopes' }, 'scopes']);
        if (user) {
            let isValidUser = bcrypt.compareSync(password, user.hashed_password);
            if (isValidUser) {
                let scopes = user.scopes.map(item => item.scope);
                let roleScopes = user.roles.map(role => role.scopes.map(item => item.scope));
                let roles = user.roles.map(role => role.role);

                let tokenPayload = {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    scopes: [...scopes, ...roleScopes].flat(Infinity),
                    roles: [...roles].flat(Infinity)
                }
                let token = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY });
                user.authToken = token;
                await User.updateOne({ _id: user._id }, { $set: { authToken: token } });
                return res.status(200).send({ ...tokenPayload, token });
            }
        }
        throw new Error("Invalid email or password!");
    } catch (error) {
        next(error);
    }
}

exports.removeToken = async (req, res, next) => {
    try {
        let email = req.user.email;
        let user = await User.findOne({ email });
        user.authToken = "";
        await user.save();
        return res.status(200).send({
            message: "Logged out!"
        })

    } catch (error) {
        next(error)
    }
}