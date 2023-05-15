import localStorageService from "../../../../servises/localStorage.service";
import completeReduxService from "../../../../servises/trash/completeRedux.service";
import {actionVacations} from "../../../../store/trash/vacations";
import {actionConfig} from "../../../../store/trash/config";
import {actionSchedule} from "../../../../store/trash/schedules";
import {actionUser} from "../../../../store/user";
import {actionMembers} from "../../../../store/trash/members";
import {actionDownload} from "../../../../store/trash/download";

export const completeRedux = async (teamId, dispatch) => {
    // // получаем id команды
    // if (!teamId) return true
    //
    // // Получаем с сервера все данные
    // const {content} = await completeReduxService.getData(teamId)
    //
    // dispatch(actionVacations.setData(content.vacations.data))
    // dispatch(actionConfig.setData(content.configTeam.data))
    // dispatch(actionSchedule.setListTitles(content.scheduleList.listTitles))
    // dispatch(actionUser.setSelectedTeam(content.user))
    // dispatch(actionUser.setUserInfo(content.user.user))
    // dispatch(actionMembers.setMembers(content.teamMembers.teamMembers))
    // dispatch(actionMembers.setMembers(content.teamMembers.teamMembers))
    // dispatch(actionDownload.setInitialDownload(true))
    //
    // localStorageService.setTeamId(teamId)
    //
    // return true
}

export const clearRedux = async (dispatch)=>{
    // dispatch(actionUser.setInitialState())
    // dispatch(actionConfig.setInitialState())
    // dispatch(actionVacations.setInitialState())
    // dispatch(actionSchedule.setInitialState())
    // dispatch(actionMembers.setInitialState())
}
