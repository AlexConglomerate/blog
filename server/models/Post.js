const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        userId: {type: String, required: true},
        caption: {type: String, required: true},
        message: {type: String, required: true},
        fileId: {type: String, required: false},
    },
    {timestamps: true}
)

module.exports = model('Post', schema)



