const express = require('express')
const router = express.Router({mergeParams: true})
const TeamConfiguration = require(`../models/TeamConfiguration`)
const Vacation = require(`../models/Vacation`)
const TeamNames = require(`../models/TeamNames`)
const User = require(`../../models/User`)
const auth = require(`../../middleware/auth.middleware`)
const {
    createNewMember,
    getScheduleListTitles,
    getVacations,
    getConfigTeam,
    getMembersInfo,
    getTeamName
} = require("./utils");


// Качественный и количественный состав всех участников команды
router.get('/:teamId', auth, async (req, res) => {
    const {_id: userId} = req.user
    const {teamId} = req.params
    try {
        const access = await TeamConfiguration.find({userId, teamId})

        if (!access) {
            res.send('TeamConfiguration is undefined')
            return
        }

        const {accessScheduleView, accessScheduleEdit, accessVacation, accessConfig} = access[0]

        const scheduleListTitles = accessScheduleView ? await getScheduleListTitles(teamId) : null
        const vacations = accessVacation ? await getVacations(teamId) : null
        const configTeam = await getConfigTeam(teamId)
        const teamName = await getTeamName(teamId)

        // Получаем список усастников команды (name, email и т.д.)
        const teamMembersId = configTeam?.map(item => item.userId)

        const teamMembers = await getMembersInfo(teamMembersId, accessConfig && configTeam)


        const configTeamWithName = configTeam?.map(item => {
            const {_doc: newItem} = {...item}
            return {
                ...newItem,
                ...teamMembers[item.userId]
            }
        })

        const vacationsWithName = vacations?.map(item => {
            return {
                ...item,
                ...teamMembers[item.userId]
            }
        })

        const user = {
            user: {...teamMembers[userId]},
            selectedTeam: {teamId, name: teamName},
            access: {accessScheduleView, accessScheduleEdit, accessVacation, accessConfig}
        }


        const reduxStore = {
            user: user,
            teamMembers: accessScheduleView ? {teamMembers} : null,
            scheduleList: {listTitles: accessScheduleView ? scheduleListTitles : null},
            vacations: {data: accessVacation ? vacationsWithName : null},
            configTeam: {data: accessConfig ? configTeamWithName : null},
        }

        res.send(reduxStore)
    } catch
        (e) {
        console.log(`e`, e)
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже.'})
    }
})

module.exports = router
