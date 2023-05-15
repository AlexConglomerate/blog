import React from 'react';
import ContextMenu from "./contextMenu";
import FiltrationSection from "./filtrationSection";
import ButtonSection from "./buttonSection";
import {useSelector} from "react-redux";
import {getSchedules} from "../../../store/trash/schedules";

function NavSchedule() {
    return (
        <>
            <div className={'flex flex-row items-center w-[1000px] my-8 h-[50px]'}>
                <FiltrationSection/>
                <ContextMenu/>
                <ButtonSection/>
            </div>
        </>
    );
}

export default NavSchedule;
