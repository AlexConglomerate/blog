const express = require('express')
const router = express.Router({mergeParams: true})
const User = require(`../../models/User`)
const auth = require(`../../middleware/auth.middleware`)
const {createNewMember} = require("./utils");
const TeamConfiguration = require(`../models/TeamConfiguration`)

const ScheduleContent = require(`../models/ScheduleContent`)
const ScheduleList = require(`../models/ScheduleList`)

const {getScheduleListTitles} = require("./utils");

router.post('/update', auth, async (req, res) => {
    try {
        console.log(`update`)
        const {editArr, versionName, scheduleId} = req.body

        // обновляем versionName
        await ScheduleList.findOneAndUpdate({_id: scheduleId}, {versionName}, {new: true, useFindAndModify: false})


        const editArr2 = editArr.map(item => {
            const {_id, scheduleId, userId, sequence, position, data} = item
            return {_id, scheduleId, userId, sequence, position, data}
        })

        const bulkOps = editArr2.map(item => ({
            updateOne: {
                filter: {_id: item._id},
                update: {$set: item}
            }
        }));


        // Массово обнавляем участников
        const qwe = await ScheduleContent.bulkWrite(bulkOps)
        res.send(qwe)
    } catch (error) {
        console.log(`error`, error)
    }
})

router.post('/createNew', auth, async (req, res) => {
    try {
        const {year, month, versionName, teamId, scheduleContent} = req.body
        const newSchedule = await ScheduleList.create({teamId, versionName, month, year, mainVersion: false,},)
        const {_id: scheduleId} = newSchedule

        const postArr = scheduleContent.map(item => {
            return {
                scheduleId,
                userId: item.userId,
                sequence: 7,
                data: item.data,
                position: item.position,
            }
        })

        // Добавляем новые графики
        const content = await ScheduleContent.insertMany(postArr)

        res.send(newSchedule)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

router.get('/getScheduleContent/:scheduleId', auth, async (req, res) => {
    try {

        // todo => нужно дописать, чтобы не отдавались графики из команд, если человека там нет в участниках
        // todo => ещё на фронтенде нужно отрабатывать, если график из другой команды (но ты там тоже есть)

        const {scheduleId} = req.params
        const dataName = await ScheduleList.find({_id: scheduleId})
        const dataSchedule = await ScheduleContent.find({scheduleId})

        if (dataName.length === 0) {
            res.send('schedule_does_not_exist')
            return
        }

        res.send({dataName, dataSchedule})

    } catch (e) {
        console.log(`eeeeeeeeeeeeeeeeee`, e)
        res.send('schedule_does_not_exist')
    }
})


router.get('/getListName/:teamId', auth, async (req, res) => {
    try {
        const {teamId} = req.params
        const qwe = await ScheduleList.find({teamId})

        res.send(qwe)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

router.post('/:scheduleId', auth, async (req, res) => {
    try {
        const editArr = [
            {
                _id: '63ec6f9d3ac4f75b3952490d',
                scheduleId: '123qwe',
                userID: '111',
                sequence: 1,
                data: [{value: 333, night: true}, {value: 2, night: false}, {value: 666, night: false},],
            },
            {
                _id: '63ec6f9d3ac4f75b39524911',
                scheduleId: '123qwe',
                userID: '222',
                sequence: 2,
                data: [{value: 111, night: false}, {value: 999, night: true}, {value: 3, night: false},],
            },
        ]


        const bulkOps = editArr.map(item => ({
            updateOne: {
                filter: {_id: item._id},
                update: {$set: item}
            }
        }));

        // Массово обнавляем участников
        const qwe = await ScheduleContent.bulkWrite(bulkOps)

        res.send(qwe)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


router.get('/getScheduleListTitles/:teamId', auth, async (req, res) => {
    try {
        const {teamId} = req.params
        const scheduleListTitles = await getScheduleListTitles(teamId)
        res.send(scheduleListTitles)
    } catch (error) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})
router.delete('/deleteSchedule/:scheduleId', auth, async (req, res) => {
    try {
        const {scheduleId} = req.params
        await ScheduleContent.deleteMany({scheduleId}) // удаляем все строчки из ScheduleContent
        await ScheduleList.deleteOne({_id: scheduleId}) // Удаляем название графика

        res.send(null)
    } catch (error) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


module.exports = router
