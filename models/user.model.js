const { Schema } = require("mongoose");

module.exports = ({ mongoose, validator, bcrypt, jwt }) => {
    let userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate: async function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email address!');
                }
                const emailCount = await User.countDocuments({ email: value })
                if (emailCount > 0) {
                    let error = new Error('Email already exists.');
                    throw error;
                }
            }
        },
        hashed_password: {
            type: String,
            required: true,
            minlength: 8,
            trim: true,
            select: false
        },
        authToken: {
            type: String,
            default: null
        },
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
        scopes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scope" }]
    })

    userSchema.virtual('password').set(function (password, next) {
        if (password) {
            this.hashed_password = this.encryptPassword(password);
        }
    })

    userSchema.methods = {
        encryptPassword: function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        }
    }

    let User = mongoose.model('User', userSchema)
    return User;
}