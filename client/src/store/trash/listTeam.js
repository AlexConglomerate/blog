import {createSlice} from "@reduxjs/toolkit";
import teamsService from "../../servises/trash/teams.service";
import localStorageService from "../../servises/localStorage.service";

const initialState = {
    teamsList: null,
}

// прописываем алгоритм: при каком action как менять состояние
const userStateSlice = createSlice({
    name: 'listTeam', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState
            return state
        },
        setList(state, {payload}) { // increment - это название action
            state.teamsList = payload
            return state
        },
        changeNameTeam: (state, {payload}) => {
            const {teamId, value} = payload
            const index = state.teamsList.findIndex(item => item.teamId == teamId)
            state.teamsList[index].name = value
            return state
        },
    }
})


// // достаём из слайса все actions и reducer
// const {actions, reducer: listTeamReducer} = userStateSlice
// export const {setList} = actions

// достаём из слайса все actions и reducer
const {actions, reducer: listTeamReducer} = userStateSlice
const {setList, changeNameTeam} = actions
export const actionListTeams = {setList, changeNameTeam}

// Шаблоны всех actions
export const setListTeam = () => async (dispatch) => {
    const userId = localStorageService.getUserId()
    const {content} = await teamsService.getUserTeams(userId)
    dispatch(actionListTeams.setList(content))
}

// прописываем функцию, через которую будем считывать state
export const getListTeams = () => state => state.listTeam


export default listTeamReducer

