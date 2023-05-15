import {createSlice} from "@reduxjs/toolkit";
import localStorageService from "../../servises/localStorage.service";
import teamsService from "../../servises/trash/teams.service";

const initialState = {
    data: null,
    idDeleteRows: [],
    listMembers: null
}

// прописываем алгоритм: при каком action как менять состояние
const userStateSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState
            return state
        },

        // Устанавливаем данные, которые взяли в БД
        setData: (state, {payload}) => {
            state.data = payload
            return state
        },

        // Получаем список участников для выпадающего списка для таблицы отпусков
        getListMembers: (state, {payload}) => {
            // нужно переписать
            payload.push({userId: '78346hr734d6r78346rjd', name: 'Select'})
            state.listMembers = payload
            return state
        },

        // Редактируем конфиг
        editRow: (state, {payload}) => {
            const {_id} = payload;
            const itemIndex = state.data.findIndex(item => item._id === _id);
            state.data[itemIndex] = {...payload, edit: true};
            return state
        },

        // Удаляем строчку
        deleteRow: (state, {payload}) => {
            const {_id} = payload
            state.idDeleteRows.push(_id)

            const itemIndex = state.data.findIndex(item => item._id === _id);
            state.data.splice(itemIndex, 1)
            return state
        },

        // Обновляем таблицу (после применения сортировки)
        updateState: (state, {payload}) => {
            state.data = payload
            return state
        },

        // Добавление новой строчки
        addNewLine: (state, {payload}) => {
            return {
                ...state,
                data: [...state.data, payload],
            };
        }
    }
})


// достаём из слайса все actions и reducer
const {actions, reducer: configReducer} = userStateSlice
const {setData, editRow, deleteRow, updateState, addNewLine, getListMembers, setInitialState} = actions
export const actionConfig = {setData, editRow, deleteRow, updateState, addNewLine, getListMembers, setInitialState}


// Забираем данные из БД
export const activeSaveChangeConfig = () => async (dispatch) => {
    const teamId = localStorageService.getTeamId()
    const {content} = await teamsService.getTeamMembers(teamId)
    dispatch(setData(content))


    const listMembers = content.map(({name, userId, position}) => {
        return {name, userId, position}
    })

    dispatch(getListMembers(listMembers))
}

// прописываем функцию, через которую будем считывать state
export const getConfigData = () => state => state.config


export default configReducer

