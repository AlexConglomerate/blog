import React, {useEffect, useState} from 'react';
import {convertMonthToDayWeek} from "./utils/utils";
import {actionSchedule, getSchedules} from "../../../store/trash/schedules";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {linkStyle} from "../../../1_ui/style/style";
import {getUser} from "../../../store/user";
import scheduleService from "../../../servises/trash/schedules.service";
import {getMembers} from "../../../store/trash/members";
import Loader from "../loader";

const TableSchedule = () => {
    const {scheduleId} = useParams()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState()

    const schedule_does_not_exist = 'schedule_does_not_exist'

    useEffect(() => {
        downloadSchedule(scheduleId)
    }, [scheduleId])

    const {members: listMembers} = useSelector(getMembers())
    const navigate = useNavigate()
    // загружаем данные с сервера
    const {scheduleContent, currentScheduleName, filter} = useSelector(getSchedules())
    const {access} = useSelector(getUser())

    const downloadSchedule = async (scheduleId) => {
        if (currentScheduleName.scheduleId === scheduleId) return
        const {content} = await scheduleService.getScheduleContent(scheduleId)
        if (content === schedule_does_not_exist) {
            setErrors(schedule_does_not_exist)
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


    const bgNight = ' bg-blue-200 '
    const border = '  border-[0.5px] border-gray-300 --text-[12px]  '
    const classDay = border + ' w-[30px] text-center flex item-center justify-center cursor-cell  '
    const classSurname = border + ' px-3  px-2 w-28  '
    const classAddCol = border + '  px-3  w-12 flex item-center justify-center '

    const frameAll = ` border-[1px] border-gray-900 `
    const frameR = ` border-r-[0.5px] border-r-gray-500 `
    const frameB = ` border-b-[0.5px] border-b-gray-500 `
    const frameL = ` border-l-[0.5px] border-l-gray-500 `


    const month = {year: currentScheduleName.year, month: currentScheduleName.month}
    const arrDayWeek = convertMonthToDayWeek(month)

    const handleChange = (e, column, row) => {
        const {value} = e.target
        dispatch(actionSchedule.editCell({value, column, row}))
    }

    const {accessConfig, accessScheduleEdit} = access

    const [editCell, setEditCell] = useState({editRow: '', editColumn: ''});

    const handleDoubleClick = (column, row) => {
        setEditCell({editRow: row, editColumn: column})
    }


    const cursorStyle = (column, row) => {
        const {editRow, editColumn} = editCell
        if (column === editColumn && row === editRow) {
            return ' cursor-text '
        }
    }

    const checkCell = (column, row) => {
        const {editRow, editColumn} = editCell
        if ((column === editColumn && row === editRow)) {
            return true
        }
    }


    if (errors === schedule_does_not_exist) {
        return (<Loader title={' 🤷 Schedule does not exist 🤷'}/>)
    }

    if (!(arrDayWeek && scheduleContent)) return (<></>)

    const countHours = (data) => {
        const hours = data.reduce((acc, cur) => {
            if (!isNaN(cur.value)) {
                return acc + Number(cur.value);
            }
            return acc;
        }, 0);
        return hours
    }
    const countSalary = (item) => {
        const coast = listMembers[item.userId]?.salary || 10
        const salary = item.data.reduce((acc, cur) => {
            if (!isNaN(cur.value)) {
                const day = cur.night ? 2 : 1
                return acc + Number(cur.value) * day * coast;
            }
            return acc;
        }, 0);
        return salary
    }


    return (
        <>
            <div className={frameAll}>
                {<div className={'flex flex-row ' + frameB}>
                    <div className={classSurname}> Surname</div>
                    <div className={classSurname + frameR}> Position</div>
                    <div className={'flex flex-row'}>
                        {arrDayWeek.map(item => (
                            <div key={item.value} className={'flex flex-col'}>
                                <div className={classDay}>{item.value}</div>
                                <div className={classDay}>{item.dayOfTheWeek}</div>
                            </div>
                        ))}
                    </div>
                    <div className={classAddCol + frameL}> Hours</div>
                    {accessConfig && <div className={classAddCol}> Salary</div>}
                </div>
                }

                {scheduleContent.map((item, row) => (item.position === filter || !filter) && (
                        <div key={item.userId} className={' flex flex-row '}>
                            {/*Имена и должности*/}
                            <div
                                className={classSurname + linkStyle}
                                onClick={() => navigate('/profile/' + item.userId, {replace: false})}
                            >
                                {item.name}
                            </div>
                            <div className={classSurname + frameR}> {item.position} </div>

                            {/*Главная часть. Дни, когда люди работают*/}
                            {item.data.map((day, column) => (
                                <React.Fragment key={day._id}>
                                    {<input
                                        className={classDay + ((day.night && !isNaN(day.value) && day.value !== '') && bgNight) + cursorStyle(column, row)}
                                        value={(day.value && day.value !== '0') ? day.value : ''}
                                        onChange={(e) => handleChange(e, column, row)}
                                        onDoubleClick={e => handleDoubleClick(column, row)}
                                        type={'text'}
                                        readOnly={(checkCell(column, row) && accessScheduleEdit) ? false : ' readOnly '}
                                    />}
                                </React.Fragment>

                            ))}
                            <div className={classAddCol + frameL}>{countHours(item.data)}</div>
                            {accessConfig && <div className={classAddCol}>{countSalary(item)}</div>}
                        </div>
                    )
                )}
            </div>
        </>
    )
}


export default TableSchedule;
