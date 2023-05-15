import React from 'react';
import CustomNav from "./customNav";
import UserStatus from "./userStatus";
import localStorageService from "../servises/localStorage.service";

function Navbar() {
    const isLogged = localStorageService.getAccessToken()

    return (
        <nav className={' flex justify-between items-center w-full h-[50px] bg-pink-500 px-10 fixed z-20 '}>
            <div className=" flex flex-row  mx-10 justify-around items-center">
                {/* Все могут зайти на домашнюю страницу и на страницу блога */}
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
