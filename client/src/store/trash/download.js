import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    initialDownload: false,
}

// прописываем алгоритм: при каком action как менять состояние
const mySlice = createSlice({
    name: 'download', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setInitialDownload: (state, {payload}) => {
            state.initialDownload = payload
            return state
        },
    }
})

// достаём из слайса все actions и reducer
const {actions, reducer: downloadReducer} = mySlice
const {setInitialDownload} = actions
export const actionDownload = {setInitialDownload}

// прописываем функцию, через которую будем считывать state
export const getDownload = () => state => {
    return state.download
}

export default downloadReducer