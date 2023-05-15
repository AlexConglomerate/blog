const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        scheduleId: {type: String, required: true},
        userId: {type: String, required: true},
        sequence: {type: Number, required: true},
        position: {type: String, required: true},
        data: [{
            value: {type: String, required: true},
            night: {type: Boolean, required: true},
        }]
    },
    {timestamps: true}
)

module.exports = model('ScheduleContent', schema)

