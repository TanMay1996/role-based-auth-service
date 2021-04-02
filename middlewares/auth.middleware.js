const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findOne({ email: decodedToken.email, authToken: token })
        if (decodedToken && user) {
            req.user = decodedToken;
            next();
        } else {
            throw new Error('Invalid Token');
        }
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

exports.authorization = function (scopes = []) {
    return async (req, res, next) => {
        try {
            let isAuthorized = false;
            let user = req.user;
            let userScopes = user.scopes;
            let commonScopes = userScopes.filter((userScope) => scopes.includes(userScope));

            if (commonScopes.length > 0) {
                isAuthorized = true;
            }

            if (!isAuthorized) {
                return res.status(401).json({
                    error: "You don't have enough permission!"
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}