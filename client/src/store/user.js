import {createSlice} from "@reduxjs/toolkit";
import localStorageService from "../servises/localStorage.service";
import postsService from "../servises/posts.service";
import moment from "moment/moment";
import usersService from "../servises/users.service";

const initialState = {
    email: '',
    name: '',
}

// прописываем алгоритм: при каком action как менять состояние
const mySlice = createSlice({
    name: 'user', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setData: (state, {payload}) => {
            console.log(`payload`, payload)
            const {email, name} = payload
            state = {email, name}
            return state
        },
    }
})

// достаём из слайса все actions и reducer
const {actions, reducer: userReducer} = mySlice
const {setData} = actions
export const actionUser = {setData}

// Забираем данные из БД
export const getUserInfo = () => async (dispatch) => {
    const userId = localStorageService.getUserId()
    const {content} = await usersService.getUserInfo(userId)
    dispatch(setData(content[0]))
    return 123
}

// прописываем функцию, через которую будем считывать state
export const getUser = () => state => {
    return state.user
}

export default userReducer