import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user";
import postsReducer from "./posts";

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}