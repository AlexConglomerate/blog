import React from 'react';
import LogOut from "../1_ui/icon/logOut";
import localStorageService from "../servises/localStorage.service";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../store/user";


function UserStatus() {
    const navigate = useNavigate()
    const {email, name} = useSelector(getUser())

    const handleLogOut = async () => {
        navigate('/', {replace: false})
        localStorageService.removeAuthData() // Удаляем все токены из localStorage
    }

    return (
        <div className={'flex flex-row items-center'}>

            <div className={'text-slate-700 font-medium w-64'}>
                <div className={''}>
                    {name && (
                        <div className={'flex flex-col gap-x-2'}>
                            <div> 🙂 {name}</div>
                            <div> ✉ {email}</div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={'flex flex-row mx-4 p-1 h-full hover:bg-slate-100  rounded-2xl cursor-pointer'}
                onClick={handleLogOut}
            >
                <LogOut/>
            </div>
        </div>
    )
}

export default UserStatus;