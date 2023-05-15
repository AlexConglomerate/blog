import httpService from "./http.service";

const addEndPoint = 'users/'

const usersService = {
    getUserInfo: async (payload) => {
        const {data} = await httpService.get(addEndPoint + payload)
        return data
    },
}


export default usersService