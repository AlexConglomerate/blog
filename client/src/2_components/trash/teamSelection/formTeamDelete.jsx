import React from 'react';
import ModalWindow from "../schedule/navSchedule/modalWindow";
import Button from "../../1_ui/button";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import teamService from "../../servises/teams.service";
import localStorageService from "../../servises/localStorage.service";
import {completeRedux} from "../schedule/table/utils/completeRedux";

function FormScheduleCreate({showModal, handleCloseForm, data}) {

    // const {currentScheduleName, listTitles} = useSelector(getSchedules())
    // const {selectedTeam} = useSelector(getUser())
    //
    //
    // const {month, year, versionName, scheduleId} = currentScheduleName
    // const scheduleName = createScheduleName({month, year,})
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDeleteTeam = async () => {
        try {
            await completeRedux()
            console.log(`123`, data.teamId)
            localStorageService.removeTeamId()
            await teamService.deleteTeam(data.teamId)
            window.location.reload()
            // await clearRedux(dispatch)
            // dispatch(setListTeam())
            // localStorageService.removeTeamId()
            handleCloseForm()
            toast(`The ${data.name} team has been removed.`)
        } catch (error) {
            toast('Error. Schedule has not been deleted.')
        }
    }

    return (
        <ModalWindow showModal={showModal} handleCloseForm={handleCloseForm}>
            <div className={'flex flex-col p-5 '}>

                <span>
                    Are you sure you want to delete
                    <br/>
                    the «<u>{data?.name}</u>» team?
                    <br/>
                </span>

                <div className={'flex flex-row gap-4 justify-center pt-10 '}>
                    <Button name={'Yes'} onClick={handleDeleteTeam}/>
                    <Button name={'No'} onClick={handleCloseForm}/>
                </div>
            </div>
        </ModalWindow>

    );
}

export default FormScheduleCreate;