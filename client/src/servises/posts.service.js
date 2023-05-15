import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const addEndPoint = 'posts/'

// Поменял с teamService
const postsService = {
    // Берем из БД отпуска этой команды
    getPosts: async () => {
        const {data} = await httpService.get(addEndPoint)
        return data
    },

    getPost: async (payload) => {
        const {data} = await httpService.get(addEndPoint + payload)
        return data
    },

    editPost: async (payload) => {
        const {data} = await httpService.put(addEndPoint, payload)
        return data
    },

    addPost: async (payload) => {
        const {data} = await httpService.post(addEndPoint, payload)
        return data
    },

    deletePost: async (payload) => {
        const {data} = await httpService.delete(addEndPoint + payload)
        return data
    },
}


export default postsService