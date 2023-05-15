const express = require('express')
const router = express.Router({mergeParams: true})
const TeamConfiguration = require(`../models/TeamConfiguration`)
const Vacation = require(`../models/Vacation`)
const TeamNames = require(`../models/TeamNames`)
const User = require(`../../models/User`)
const auth = require(`../../middleware/auth.middleware`)
const {createNewMember} = require("./utils");

// Качественный и количественный состав всех участников команды
router.get('/:teamId', auth, async (req, res) => {
    try {
        const userId = req.user._id // из запроса достаём userId (он нужен для проверки, есть ли у этого пользователя доступ к этим данным)
        const {teamId} = req.params

        // Проверяем, есть ли у человека доступ к этим данным
        const thisUser = await TeamConfiguration.findOne({teamId, userId})
        const access = thisUser.accessVacation

        // Если у человека нет доступа
        if (!access) res.status(200).json({message: 'You do not have permission to get the configuration of this command'})

        // Если у человека доступ есть
        if (access) {
            // Получаем отпуска этой команды (фильтруем по teamId)
            const filteredVacations = await Vacation.find({teamId})

            // Получаем массив из id юзеров, которые есть в нашей команде
            const usersId = filteredVacations.map(item => item.userId)

            // Получаем юзеров, отфильтрованные по массиву usersId
            const filteredUsers = await User.find({_id: {$in: usersId}})

            // Делаем копиии, потому что иначе ничего не работает
            const filteredTeamMembers_copy = JSON.parse(JSON.stringify(filteredVacations))
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


// Сохранение отпусков
router.post('/', auth, async (req, res) => {
    try {
        const {editArr, deleteArr, postArr} = req.body

        // удаляем отпуска
        await Vacation.deleteMany({"_id": {"$in": deleteArr}})

        const bulkOps = editArr.map(item => ({
            updateOne: {
                filter: {_id: item._id},
                update: {$set: item}
            }
        }));

        console.log(`bulkOps`, JSON.stringify(bulkOps, null, 5))

        // Массово обнавляем участников
        await Vacation.bulkWrite(bulkOps)

        // Добавляем новые отпуска из массива postArr
        await Vacation.insertMany(postArr)

        res.status(200).send(null)

    } catch (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

// // Добавление новой команды
// router.post('/createNewTeam', auth, async (req, res) => {
//     try {
//         const {name, userId} = req.body
//
//         // создаём новую команду
//         const {_id: teamId} = await TeamNames.create({name})
//
//         // Добавляем в эту группу текущего пользователя
//         createNewMember(teamId, userId, true)
//
//         res.status(200).send({teamId})
//
//     } catch (e) {
//         res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
//     }
// })
//
//
// // Сохранение конфигурации команды
// router.post('/saveChange', auth, async (req, res) => {
//     try {
//         const {editArr, deleteArr} = req.body
//
//         // удаляем участников
//         await TeamConfiguration.deleteMany({"_id": {"$in": deleteArr}})
//
//         const bulkOps = editArr.map(item => ({
//             updateOne: {
//                 filter: {_id: item._id},
//                 update: {$set: item}
//             }
//         }));
//
//         // Массово обнавляем участников
//         await TeamConfiguration.bulkWrite(bulkOps)
//
//         res.status(200).send(null)
//
//     } catch (e) {
//         res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
//     }
// })
//
// // Добавление нового участника
// router.post('/addNewMember', auth, async (req, res) => {
//     try {
//         const {email, teamId} = req.body
//         const data = await User.find({"email": email}) // Проверяем, есть ли такой пользователь в команде
//         const userExist = data.length !== 0
//
//         if (!userExist) {
//             console.log('USER_DOES_NOT_EXIST')
//             res.status(200).json({message: 'USER_DOES_NOT_EXIST'})
//             return
//         }
//
//         if (userExist) {
//             const {email, name, _id: userId} = data[0]
//             const content = {email, name, userId}
//
//             // Нужно также проверить, есть ли этот пользователь сейчас в команде
//             const findUser = await TeamConfiguration.findOne({userId, teamId})
//
//             if (findUser !== null) {
//                 res.status(200).json({message: 'THIS_USER_IS_ALREADY_IN_A_TEAM'})
//                 return
//             }
//
//             // Если пользователя нет в сисеме (то есть как и надо)
//             if (findUser === null) {
//                 const newMember = await createNewMember(teamId, userId, false) // то добавляем нового участника в команду
//                 console.log(`newMember`, newMember)
//                 const response = {...newMember._doc, name}
//
//                 console.log(`response`, response)
//                 res.status(201).send(response) // высылаем на фронтенд форму с ним
//             }
//         }
//
//     } catch (e) {
//         res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
//     }
// })

module.exports = router