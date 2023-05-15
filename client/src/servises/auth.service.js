import axios from "axios";
import localStorageService from "./localStorage.service";
import {config} from "../config.js";


const httpAuth = axios.create({
    baseURL: config.apiEndPoint + 'auth/',
});

const authService = {
    register: async (payload) => {
        const {data} = await httpAuth.post(`signUp`, payload)
        return data;
    },
    login: async (payload) => {
        const {data} = await httpAuth.post(`signInWithPassword`, payload);
        return data;
    },
    refresh: async () => {
        const {data} = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
