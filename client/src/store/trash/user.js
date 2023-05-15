import {createSlice} from "@reduxjs/toolkit";
import localStorageService from "../servises/localStorage.service";

const initialState = {
    user: {
        email: null, name: null, telegramUserName: null,
    },
    selectedTeam: null,
    access: {
        accessScheduleView: false,
        accessScheduleEdit: false,
        accessVacation: false,
        accessConfig: false,
    }
}

// прописываем алгоритм: при каком action как менять состояние
const mySlice = createSlice({
    name: 'user', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState
            return state
        },
        setSelectedTeam(state, {payload}) { // increment - это название action
            const {selectedTeam, access} = payload

            localStorageService.setTeamId(selectedTeam.teamId)
            state.selectedTeam = selectedTeam
            state.access = access

            return state
        },
        setUserInfo(state, {payload}) {
            const {email, name, telegramUserName} = payload
            state.user = {email, name, telegramUserName}
        },
        editTelegramUserName: (state, {payload}) => {
            state.user.telegramUserName = payload
            return state
        },
    }
})

// достаём из слайса все actions и reducer
const {actions, reducer: userReducer} = mySlice
const {setSelectedTeam, setUserInfo, setInitialState, editTelegramUserName} = actions
export const actionUser = {setSelectedTeam, setUserInfo, setInitialState, editTelegramUserName}

// прописываем функцию, через которую будем считывать state
export const getUser = () => state => {
    return state.user
}

export default userReducer