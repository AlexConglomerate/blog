import axios from "axios";
// import {logger} from "./log.servise";
import {toast} from "react-toastify";
import {config} from "../config.js";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: config.apiEndPoint
})

// http.interceptors.response - это перехватчик ответа с сервера
// http.interceptors.request - это перехватчик запросов

// Если ошибка, меняем / на .json, и снова делаем запрос
http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (config.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            if (isExpired) {
                const data = await authService.refresh();

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            if (isExpired) {
                const data = await authService.refresh();
                localStorageService.setTokens(data);
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data;
}

// Тут перехватываем ошибки сервера. interceptors - перехватчики. response - ошибки
http.interceptors.response.use(
    (res) => {
        if (config.isFireBase) {
            res.data = {content: transformData(res.data)};
        }
        res.data = {content: res.data}
        return res;
    },
    e => {
        const isExpectedError = e.response && e.response.status >= 400 && e.response.status < 500;
        if (!isExpectedError) {
            // Тут отлавливаем ошибки сервера через Sentry.
            // Подробнее: https://lk.result.school/pl/teach/control/lesson/view?id=253585341
            // Подробнее: https://lk.result.school/pl/teach/control/lesson/view?id=258593031
            // logger.log(e) // Отправляем ошибку на Sentry
            toast.error("ОШИБКА НА СЕРВЕРЕ" + e) // делаем тост
            console.log(`Неожидаемая ошибка. Что-то с сервером. Название ошибки: `, e.response.data)
        }
        return Promise.reject(e)
    })


const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
}

export default httpService