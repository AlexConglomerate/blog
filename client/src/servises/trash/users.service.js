import httpService from "../http.service";
import localStorageService from "../localStorage.service";

const addEndPoint = 'users/'

const usersService = {
    getCurrentUser: async () => {
        const {data} = await httpService.get(
            addEndPoint + localStorageService.getUserId()
        );
        return data;
    },
    getUserInfo: async (userId) => {
        const {data} = await httpService.get(addEndPoint + 'getUserInfo/' + userId);
        return data;
    },
    updateTelegramUserName: async (payload) => {
        const {data} = await httpService.put(addEndPoint + 'updateTelegramUserName/', payload);
        return data;
    }
}


export default usersService