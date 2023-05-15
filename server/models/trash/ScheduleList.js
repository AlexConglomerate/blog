const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        teamId: {type: String, required: true},
        versionName: {type: String, required: true},
        month: {type: Number, required: true},
        year: {type: Number, required: true},
        mainVersion: {type: Boolean, required: true},
    },
    {timestamps: true}
);

module.exports = model('ScheduleList', schema);
