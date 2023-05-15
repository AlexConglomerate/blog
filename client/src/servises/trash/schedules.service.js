import httpService from "../http.service";
import localStorageService from "../localStorage.service";

const addEndPoint = 'schedules/'

const scheduleService = {
    createNew: async (payload) => {
        const teamId = localStorageService.getTeamId()
        const {data} = await httpService.post(addEndPoint + 'createNew/', {...payload, teamId})
        return data;
    },
    getListName: async () => {
        const teamId = localStorageService.getTeamId()
        const {data} = await httpService.get(addEndPoint + 'getListName/' + teamId)
        return data;
    },
    getScheduleContent: async (scheduleId) => {
        const {data} = await httpService.get(addEndPoint + 'getScheduleContent/' + scheduleId)
        return data;
    },
    // начал писать для обновления графика
    update: async (scheduleContent) => {
        const {data} = await httpService.post(addEndPoint + 'update/', scheduleContent)
        return data;
    },
    getScheduleListTitles: async (teamId) => {
        const {data} = await httpService.get(addEndPoint + 'getScheduleListTitles/' + teamId)
        return data;
    },
    deleteSchedule: async (scheduleId) => {
        const {data} = await httpService.delete(addEndPoint + 'deleteSchedule/' + scheduleId)
        return data;
    },

}


export default scheduleService