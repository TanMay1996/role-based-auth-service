module.exports = ({ mongoose, validator, bcrypt, jwt }) => {
    return mongoose.model('Scope', {
        scope: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    })
}
