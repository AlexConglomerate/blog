const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        password: {type: String, required: true,},
        name: {type: String, required: true,},
        email: {type: String, required: true, unique: true},
    },
    {timestamps: true,}
)
module.exports = model('User', schema)
