import httpService from "../http.service";

const addEndPoint = 'completeRedux/'

// Поменял с teamService
const completeReduxService = {
    // Берем из БД отпуска этой команды
    getData: async (teamId) => {
        const {data} = await httpService.get(addEndPoint + teamId)
        return data
    },
}


export default completeReduxService