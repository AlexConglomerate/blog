const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        teamId: {type: String, required: true,},
        userId: {type: String, required: true,},
        start: {type: Date, required: true,},
        end: {type: Date, required: true,},
        type: {type: String, required: true,},
    },
    {timestamps: true,} // тут будет прописано, когда эта модель была создана и обновлена
)
module.exports = model('Vacation', schema)
