import httpService from "../http.service";

const addEndPoint = 'teams/'

const teamsService = {

    // Забираем с сервера все команды с конфигурацией и названиями
    getUserTeams: async (userId) => {
        const {data} = await httpService.get(addEndPoint + 'userTeams/' + userId)
        return data
    },

    // Забираем с сервера состав одной команды
    getTeamMembers: async (teamId) => {
        const {data} = await httpService.get(addEndPoint + 'teamMembers/' + teamId)
        return data
    },

    // Создание новой команды
    createNewTeam: async (payload) => {
        const {data} = await httpService.post(addEndPoint + 'createNewTeam/', payload)
        return data
    },

    saveChange: async (payload) => {
        const {data} = await httpService.post(addEndPoint + 'saveChange/', payload)
        return data
    },

    // Добавление нового участника в команду
    addNewMember: async (payload) => {
        const {data} = await httpService.post(addEndPoint + 'addNewMember/', payload)
        return data
    },

    deleteTeam: async (teamId) => {
        const {data} = await httpService.delete(addEndPoint + teamId)
        return data
    },
    saveTeamName: async ({teamId, name}) => {
        const {data} = await httpService.put(addEndPoint + 'saveTeamName/' + teamId, {name})
        return data
    },

}


export default teamsService