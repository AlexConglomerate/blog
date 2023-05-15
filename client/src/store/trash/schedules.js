import {createSlice} from "@reduxjs/toolkit";
import scheduleService from "../../servises/trash/schedules.service";

const initialState = {
    listTitles: null,
    scheduleContent: null,
    currentScheduleName: {year: '', month: '', versionName: '', mainVersion: '', scheduleId: '', teamId: ''},
    filter: null,
}

// прописываем алгоритм: при каком action как менять состояние
const mySlice = createSlice({
    name: 'schedules', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState
            return state
        },
        setListTitles: (state, {payload}) => {
            state.listTitles = payload
            return state
        },
        setScheduleContent: (state, {payload}) => {
            state.scheduleContent = payload
            return state
        },

        // Редактируем ячейку
        editCell: (state, {payload}) => {
            const {value, column, row} = payload
            state.scheduleContent[row].data[column].value = value
            state.scheduleContent[row].edit = true
            return state
        },

        setCurrentScheduleName: (state, {payload}) => {
            state.currentScheduleName = payload
            return state
        },
        editVersionName: (state, {payload}) => {
            state.currentScheduleName.versionName = payload
            return state
        },
        addNewTitle: (state, {payload}) => {
            state.listTitles.push(payload)
            return state
        },
        setFilter: (state, {payload}) => {
            state.filter = payload
        },
    }
})


const {actions, reducer: scheduleReducer} = mySlice
const {
    setListTitles,
    setScheduleContent,
    setCurrentScheduleName,
    setInitialState,
    editCell,
    editVersionName,
    addNewTitle,
    setFilter,
} = actions
export const actionSchedule = {
    setListTitles,
    setScheduleContent,
    setCurrentScheduleName,
    setInitialState,
    editCell,
    editVersionName,
    addNewTitle,
    setFilter,
}


// прописываем функцию, через которую будем считывать state
export const actionDownloadListTitles = (teamId) => async dispatch => {
    try {
        const {content} = await scheduleService.getScheduleListTitles(teamId)
        dispatch(actionSchedule.setListTitles(content))
    } catch (e) {
        console.log(`e`, e)
    }
}

// Забираем с сервера текущий график
export const actionGetScheduleContent2 = (scheduleContent) => async (dispatch) => {
    try {
        dispatch(setScheduleContent(scheduleContent))
    } catch (e) {
        console.log(`e`, e)
    }
}

export const getSchedules = () => state => state.schedules

export default scheduleReducer