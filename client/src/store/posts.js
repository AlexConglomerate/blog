import {createSlice} from "@reduxjs/toolkit";
import postsService from "../servises/posts.service";

const moment = require('moment');

const initialState = {
    data: null,
}

// прописываем алгоритм: при каком action как менять состояние
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPost: (state, {payload}) => {
            state.data = payload
            return state
        },
        deletePost: (state, {payload}) => {
            const itemIndex = state.data.findIndex(item => item._id == payload);
            state.data.splice(itemIndex, 1)
            return state
        },
        addPost: (state, {payload}) => {
            console.log(`addPost payload`, payload)
            return state
        },
    }
})


// достаём из слайса все actions и reducer
const {actions, reducer: postsReducer} = postSlice
const {setPost, deletePost, addPost} = actions
export const actionPosts = {setPost, deletePost, addPost}

// Забираем данные из БД
export const downloadPost = () => async (dispatch) => {
    const {content} = await postsService.getPosts()

    // Преобразуем дату из формата "2022-10-03T00:00:00.000Z" в формат "2022-10-03"
    const _posts = content.map(item => {
        return {
            ...item,
            date: moment(item.updatedAt).format('DD-MM-YYYY HH:mm')
        }
    })

    dispatch(setPost(_posts))
}

// прописываем функцию, через которую будем считывать state
export const getPosts = () => state => state.posts


export default postsReducer

