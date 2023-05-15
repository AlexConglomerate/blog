import React, {useState} from 'react';
import TextFrame from "../../../1_ui/textFrame";
import {buttonStyle} from "../../../1_ui/style/style";
import scheduleService from "../../../servises/trash/schedules.service";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {actionDownloadListTitles, actionSchedule, getSchedules} from "../../../store/trash/schedules";
import {getUser} from "../../../store/user";
import Trash from "../../../1_ui/icon/trash";
import FormScheduleDelete from "../../blog/formPostDelete";
import {getMembers} from "../../../store/trash/members";

function ButtonSection(props) {
    const dispatch = useDispatch()
    const {currentScheduleName, scheduleContent} = useSelector(getSchedules())
    const {selectedTeam, access} = useSelector(getUser())
    const {versionName, scheduleId} = currentScheduleName
    const {accessScheduleEdit} = access

    const handleSave = async () => {
        // Берём все объекты, у которых есть edit === true
        const editArrRaw = scheduleContent.filter(item => item?.edit === true)
        // Удаляем из объекта некоторые поля createdAt, updatedAt, __v, edit,
        const editArr = editArrRaw.map(obj => {
            const {createdAt, updatedAt, __v, edit, ...rest} = obj;
            return rest;
        });

        await scheduleService.update({editArr, versionName, scheduleId})
        toast('Schedule saved')
        dispatch(actionDownloadListTitles(selectedTeam.teamId))
    }


    const handleChange = (e) => {
        if (!accessScheduleEdit) return
        const value = e.target.value
        dispatch(actionSchedule.editVersionName(value))
    }

    const [showModal, setShowModal] = useState(false);
    const handleCloseForm = () => setShowModal(false)
    const handleOpenForm = () => setShowModal(true)

    const schedule_does_not_exist = 'schedule_does_not_exist'
    const {members: listMembers} = useSelector(getMembers())
    const resetSchedule = async () => {
        if (!currentScheduleName?.scheduleId) return
        const scheduleId = currentScheduleName.scheduleId
        const {content} = await scheduleService.getScheduleContent(scheduleId)
        if (content === schedule_does_not_exist) {
            return
        }
        const {dataSchedule, dataName} = content
        const {month, year, versionName, mainVersion} = dataName[0]

        // готовим скачанный с сервера график (добавляем имена)
        const scheduleContent = dataSchedule.map(item => {
            const elem = Object.values(listMembers).find(members => members.userId === item.userId)
            return {...item, ...elem}
        })

        // фиксируем выбранный график в редаксе
        dispatch(actionSchedule.setCurrentScheduleName({month, year, versionName, mainVersion, scheduleId}))
        dispatch(actionSchedule.setScheduleContent(scheduleContent))
        return true
    }

    return (
        <div>
            <div className={'flex flex-row'}>
                <div className="relative w-[150px]  ">
                    <TextFrame
                        label={'Version name'}
                        placeholder={'Enter version name'}
                        type={'text'}
                        value={versionName && versionName}
                        onChange={(e) => handleChange(e)}
                        readOnly={accessScheduleEdit ? ' readOnly ' : false}
                    />
                </div>

                {accessScheduleEdit && <div className={'flex space-x-4 rounded-lg border-2 border-slate-100'}>
                    <button className={buttonStyle} onClick={handleSave}> Save</button>
                    <button className={buttonStyle} onClick={resetSchedule}>Reset</button>
                    <button className={buttonStyle} onClick={handleOpenForm}><Trash/></button>
                    <FormScheduleDelete
                        handleCloseForm={handleCloseForm}
                        showModal={showModal}
                        currentScheduleName={currentScheduleName}
                        selectedTeam={selectedTeam}
                    />
                </div>}
            </div>
        </div>
    );
}

export default ButtonSection;