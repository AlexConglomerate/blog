const TeamConfiguration = require(`../models/TeamConfiguration`)
const ScheduleContent = require(`../models/ScheduleContent`)
const ScheduleList = require(`../models/ScheduleList`)
const Vacation = require(`../models/Vacation`)
const User = require(`../../models/User`)
const TeamNames = require(`../models/TeamNames`)


// для создания нового учстника команды в коллекции TeamConfiguration. access - булевая переменная. Обозначает доступ.
exports.createNewMember = async (teamId, userId, access) => await TeamConfiguration.create({
    teamId,
    userId,
    position: 'Junior',
    shift: 1,
    salary: 10,
    includeInSchedule: false,
    accessScheduleView: access,
    accessScheduleEdit: access,
    accessVacation: access,
    accessConfig: access,
})

// Получаем права юзера
exports.getUserAccess = async (userId) => {
    return await TeamConfiguration.find({userId})
}

// Получение списка графиков для выбранной команды
exports.getScheduleListTitles = async (teamId) => {
    return await ScheduleList.find({teamId})
    // return await ScheduleList.find({_id: teamId})
}

// Получение отпусков для выбранной команды
exports.getVacations = async (teamId) => {

    const vacation = await Vacation.find({teamId})

    // Преобразуем дату из формата "2022-10-03T00:00:00.000Z" в формат "2022-10-03"
    const newVacation = vacation.map(item => {
        const {_doc: newItem} = item
        return {
            ...newItem,
            start: newItem.start.toISOString().split("T")[0],
            end: newItem.end.toISOString().split("T")[0],
        }
    })

    return newVacation
}

// Получение конфига для выбранной команды
exports.getConfigTeam = async (teamId) => {
    return await TeamConfiguration.find({teamId})
}

// Получение имен пользователей по массиву id
exports.getMembersInfo = async (membersId, configTeam) => {
    const users = await User.find({_id: {$in: membersId}})

    return users.reduce((acc, item) => {
        let obj = {}

        if (configTeam) {
            const configInfo = configTeam.find(subItem => subItem.userId === String(item._id))
            const {salary} = configInfo
            obj = {salary}
        }

        const {name, email, telegramUserName, _id: userId} = item
        acc[userId] = {name, email, userId, telegramUserName, ...obj}
        return acc
    }, {})
}

// Получение имен пользователей по массиву id
exports.getTeamName = async (teamId) => {
    const teamName = await TeamNames.find({_id: teamId})
    return teamName[0].name
}

