const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        teamId: {type: String, required: true,},
        userId: {type: String, required: true,},
        position: {type: String, required: true,},
        shift: {type: Number, required: true,},
        salary: {type: Number, required: true,},
        includeInSchedule: {type: Boolean, required: true,},
        accessScheduleView: {type: Boolean, required: true,},
        accessScheduleEdit: {type: Boolean, required: true,},
        accessVacation: {type: Boolean, required: true,},
        accessConfig: {type: Boolean, required: true,},
    },
    {timestamps: true,}
)
module.exports = model('TeamConfiguration', schema)
