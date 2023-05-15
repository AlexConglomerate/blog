import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user";
import listTeamReducer from "./trash/listTeam";
import configReducer from "./trash/config";
import vacationReducer from "./trash/vacations";
import scheduleReducer from "./trash/schedules";
import membersReducer from "./trash/members";
import downloadReducer from "./trash/download";
import postsReducer from "./posts";

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    listTeam: listTeamReducer,
    config: configReducer,
    vacations: vacationReducer,
    schedules: scheduleReducer,
    members: membersReducer,
    download: downloadReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}