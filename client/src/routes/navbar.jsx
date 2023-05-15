import React from 'react';
import CustomNav from "./customNav";
import {useSelector} from "react-redux";
import UserStatus from "./userStatus";
import {getUser} from "../store/user";
import {getSchedules} from "../store/trash/schedules";
import localStorageService from "../servises/localStorage.service";

function Navbar() {
    const {access, user} = useSelector(getUser())
    const {currentScheduleName} = useSelector(getSchedules())
    const {scheduleId} = currentScheduleName
    const pathSchedule = '/schedule/' + (scheduleId ? scheduleId : '')

    const isLogged = localStorageService.getAccessToken()
    // const isLogged = user?.name

    const {
        accessScheduleView = false,
        accessScheduleEdit = false,
        accessVacation = false,
        accessConfig = false,
    } = access || {}


    return (
        <nav className={' flex justify-between items-center w-full h-[50px] bg-pink-500 px-10 fixed z-20 '}>
            {/* закомментирован вариант с градиентом*/}
            {/*<nav className={' flex justify-between items-center w-full h-[50px] px-10 fixed bg-gradient-to-r from-pink-500 -via-red-500 -to-yellow-500 to-red-500  shadow-xl'}>*/}

            <div className=" flex flex-row  mx-10 justify-around items-center">
                {/* Все могут зайти на домашнюю страницу */}
                <CustomNav to='/' name='Home'/>
                <CustomNav to='/blog' name='Blog'/>
            </div>
            <div>
                {isLogged && <UserStatus/>}
                {/* Если не зарегистрировался, то показываем ещё страницу авторизации */}
                {!isLogged && <CustomNav to='/auth' name='Auth'/>}
            </div>
        </nav>
    );
}

export default Navbar;
