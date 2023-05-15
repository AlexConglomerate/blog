import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    members: null,
}

// прописываем алгоритм: при каком action как менять состояние
const mySlice = createSlice({
    name: 'members', // первое слово в названии action + '/'
    initialState,
    reducers: {
        setInitialState: (state) => {
            state = initialState
            return state
        },
        setMembers(state, {payload}) { // increment - это название action
            state.members = payload
            return state
        },
        addNewMembers(state, {payload}) {
            const newMembers = {...state.members, ...payload}
            state.members = newMembers
            return state
        },
    }
})

// достаём из слайса все actions и reducer
const {actions, reducer: membersReducer} = mySlice
const {setMembers, setInitialState, addNewMembers} = actions
export const actionMembers = {setMembers, setInitialState, addNewMembers}

// прописываем функцию, через которую будем считывать state
export const getMembers = () => state => state.members


export default membersReducer
