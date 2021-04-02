const mongoose = require('../config/mongoose.config');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//models import and inject dependency

const User = require('./user.model')({mongoose,validator,bcrypt})
const Role = require('./role.model')({mongoose,validator})
let Scope = require('./scope.model')({mongoose,validator})


module.exports={
    User,
    Role,
    Scope
}