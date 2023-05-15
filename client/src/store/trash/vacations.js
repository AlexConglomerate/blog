import {createSlice} from "@reduxjs/toolkit";
import vacationService from "../../servises/trash/vacations.service";

const initialState = {
    data: null,
    idDeleteRows: [],
}

// прописываем алгоритм: при каком action как менять состояние
const userStateSlice = createSlice({
    name: 'vacations',
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
            if (payload?.post !== true) {
                // Если строчка добавлена только на фронтенде, но её нет на бекенде, то не добавляем в массив idDeleteRows.
                // Т.е. если у неё есть поле post === true
                state.idDeleteRows.push(_id)
            }

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
        },
    }
})


// достаём из слайса все actions и reducer
const {actions, reducer: vacationReducer} = userStateSlice
const {setData, editRow, deleteRow, updateState, addNewLine, setInitialState} = actions
export const actionVacations = {setData, editRow, deleteRow, updateState, addNewLine, setInitialState}

// Забираем данные из БД
export const activeSaveChangeVacation = () => async (dispatch) => {
    const {content} = await vacationService.getVacations()

    // Преобразуем дату из формата "2022-10-03T00:00:00.000Z" в формат "2022-10-03"
    const newVacation = content.map(item => {
        return {
            ...item,
            start: item.start.split("T")[0],
            end: item.end.split("T")[0],
        }
    })

    dispatch(setData(newVacation))
}

// прописываем функцию, через которую будем считывать state
export const getVacationData = () => state => state.vacations


export default vacationReducer

