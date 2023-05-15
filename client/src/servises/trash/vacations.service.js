import httpService from "../http.service";
import localStorageService from "../localStorage.service";

const addEndPoint = 'vacations/'

// Поменял с teamService
const vacationsService = {
    // Берем из БД отпуска этой команды
    getVacations: async () => {
        const teamId = localStorageService.getTeamId()
        const {data} = await httpService.get(addEndPoint + '/' + teamId)
        return data
    },

    // Сохраняем в БД отпуска этой команды
    saveChange: async (payload) => {
        const {data} = await httpService.post(addEndPoint, payload)
        return data
    },
}


export default vacationsService