module.exports = ({ mongoose, validator, bcrypt, jwt }) => {
    return mongoose.model('Role', {
        role: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        scopes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scope" }]
    })
}