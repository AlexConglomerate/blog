import React from 'react';
import NavSchedule from "../../2_components/schedule/navSchedule/navSchedule";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {getDownload} from "../../store/trash/download";
import Loader from "../../2_components/schedule/loader";


function Schedule() {
    const {initialDownload} = useSelector(getDownload())

    return (
        <div className={'flex flex-col items-center'}>
            <NavSchedule/>
            {initialDownload
                ? <Outlet/>
                : <Loader title={'Please wait'}/>
            }
        </div>
    );
}

export default Schedule;