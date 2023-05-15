const express = require('express')
const router = express.Router({mergeParams: true})
const TeamConfiguration = require(`../models/TeamConfiguration`)
const TeamNames = require(`../models/TeamNames`)
const User = require(`../../models/User`)
const auth = require(`../../middleware/auth.middleware`)
const {createNewMember} = require("./utils");
const Vacation = require(`../models/Vacation`)
const ScheduleContent = require(`../models/ScheduleContent`)
const ScheduleList = require(`../models/ScheduleList`)


// получаем все команды от этого юзера
router.get('/userTeams/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        // Получаем конфиги всех команд, где есть этот юзер
        const filteredTeamsConfig = await TeamConfiguration.find({userId: userId})

        // Получаем массив из id команд, в которых состоит этот user
        const teamsId = filteredTeamsConfig.map(item => item.teamId)

        // Получаем команды, отфильтрованные по массиву teamsId
        const filteredTeams = await TeamNames.find({_id: {$in: teamsId}})

        // Делаем копиии, потому что иначе ничего не работает
        const filteredTeams_copy = JSON.parse(JSON.stringify(filteredTeams))
        const filteredTeamsConfig_copy = JSON.parse(JSON.stringify(filteredTeamsConfig))

        // Объединяем массивы filteredTeams_copy и filteredTeamsConfig_copy
        const userTeamsInfo = filteredTeams_copy.map(item => {
            const findedTeamsConfig = filteredTeamsConfig_copy.find(subItem => item._id == subItem.teamId)
            return {...item, ...findedTeamsConfig}
        })

        res.status(200).send(userTeamsInfo)
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


// Качественный и количественный состав всех участников команды
router.get('/teamMembers/:teamId', auth, async (req, res) => {
    try {
        const userId = req.user._id // из запроса достаём userId (он нужен для проверки, есть ли у этого пользователя доступ к этим данным)
        const {teamId} = req.params

        // Получаем команды, отфильтрованные по teamId
        const filteredTeamMembers = await TeamConfiguration.find({teamId})

        // Проверяем, есть ли пользователь в полученном списке и есть ли у него доступ к конфигу
        const access = filteredTeamMembers.some(item => (item.userId == userId && item.accessConfig == true))

        // Если у человека нет доступа
        if (!access) res.status(200).json({message: 'You do not have permission to get the configuration of this command'})

        // Если у человека доступ есть
        if (access) {
            // Добавляем имена пользователей:

            // Получаем массив из id юзеров, которые есть в нашей команде
            const usersId = filteredTeamMembers.map(item => item.userId)

            // Получаем команды, отфильтрованные по массиву usersId
            const filteredUsers = await User.find({_id: {$in: usersId}})

            // Делаем копиии, потому что иначе ничего не работает
            const filteredTeamMembers_copy = JSON.parse(JSON.stringify(filteredTeamMembers))
            const filteredUsers_copy = JSON.parse(JSON.stringify(filteredUsers))

            // Объединяем массивы filteredTeamMembers_copy и filteredUsers_copy
            const teamConfig = filteredTeamMembers_copy.map(item => {
                const findedUser = filteredUsers_copy.find(subItem => item.userId == subItem._id)
                const {name, email} = findedUser
                return {...item, name, email}
            })

            res.send(teamConfig)
        }

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

// Добавление новой команды
router.post('/createNewTeam', auth, async (req, res) => {
    try {
        const {name, userId} = req.body

        // создаём новую команду
        const {_id: teamId} = await TeamNames.create({name})

        // Добавляем в эту группу текущего пользователя
        createNewMember(teamId, userId, true)

        res.status(200).send({teamId})

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


// Сохранение конфигурации команды
router.post('/saveChange', auth, async (req, res) => {
    try {
        const {editArr, deleteArr} = req.body

        // удаляем участников
        await TeamConfiguration.deleteMany({"_id": {"$in": deleteArr}})

        console.log(`editArr`, editArr)
        const bulkOps = editArr.map(item => ({
            updateOne: {
                filter: {_id: item._id},
                update: {$set: item}
            }
        }));


        // Массово обнавляем участников
        await TeamConfiguration.bulkWrite(bulkOps)

        res.status(200).send(null)

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

// Добавление нового участника
router.post('/addNewMember', auth, async (req, res) => {
    try {
        const {email, teamId} = req.body
        const data = await User.find({"email": email}) // Проверяем, есть ли такой пользователь в команде
        const userExist = data.length !== 0

        if (!userExist) {
            console.log('USER_DOES_NOT_EXIST')
            res.status(200).json({message: 'USER_DOES_NOT_EXIST'})
            return
        }

        if (userExist) {
            const {email, name, _id: userId} = data[0]
            const content = {email, name, userId}

            // Нужно также проверить, есть ли этот пользователь сейчас в команде
            const findUser = await TeamConfiguration.findOne({userId, teamId})

            if (findUser !== null) {
                res.status(200).json({message: 'THIS_USER_IS_ALREADY_IN_A_TEAM'})
                return
            }

            // Если пользователя нет в сисеме (то есть как и надо)
            if (findUser === null) {
                const newMember = await createNewMember(teamId, userId, false) // то добавляем нового участника в команду
                console.log(`newMember`, newMember)
                const response = {...newMember._doc, name}

                console.log(`response`, response)
                res.status(201).send(response) // высылаем на фронтенд форму с ним
            }
        }

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

// Добавление новой команды
router.delete('/:teamId', auth, async (req, res) => {
    try {
        const {teamId} = req.params

        const {deletedCount: _TeamNames} = await TeamNames.deleteOne({teamId})
        const {deletedCount: _TeamConfiguration} = await TeamConfiguration.deleteMany({"teamId": teamId})
        const {deletedCount: _Vacation} = await Vacation.deleteMany({"teamId": teamId})

        const list = await ScheduleList.find({teamId})
        const scheduleIdArr = list.reduce((acc, cur) => {
            acc.push(cur._id)
            return acc
        }, [])


        console.log(`scheduleIdArr`, scheduleIdArr)

        const {deletedCount: _ScheduleContent} = await ScheduleContent.deleteMany({"scheduleId": {"$in": scheduleIdArr}})
        const {deletedCount: _ScheduleList} = await ScheduleList.deleteMany({"teamId": teamId})


        const a = {_TeamNames, _TeamConfiguration, _Vacation, _ScheduleContent, _ScheduleList, scheduleIdArr}

        res.status(200).send(a)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

router.put('/saveTeamName/:teamId', auth, async (req, res) => {
    try {
        const {teamId} = req.params
        const {name} = req.body
        const update = await TeamNames.findOneAndUpdate({_id: teamId}, {name}, {new: true, useFindAndModify: false})
        res.status(200).send(update)
    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})


module.exports = router