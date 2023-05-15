import React, {useState} from 'react';
import Check from "../../1_ui/icon/check";
import Trash from "../../1_ui/icon/trash";
import Button from "../../1_ui/button";
import FormTeamDelete from "./formTeamDelete";
import {useDispatch} from "react-redux";
import {actionListTeams} from "../../store/listTeam";
import teamsService from "../../servises/teams.service";
import {toast} from "react-toastify";

function TeamCard({data, onClick, select}) {
    const {name, accessScheduleView, accessScheduleEdit, accessVacation, accessConfig, teamId} = data
    const accessClass = 'm-1 p-1 rounded-2xl text-[9px] '
    const dispatch = useDispatch()

    const handleOpenDeletedForm = async () => {
        handleOpenForm()
    }

    const handleSave = async () => {
        await teamsService.saveTeamName({teamId, name})
        toast('Name updated')
    }

    const handleChange = ({target}) => {
        const {value} = target
        dispatch(actionListTeams.changeNameTeam({value, teamId}))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave()
        }
    };

    const [showModal, setShowModal] = useState(false);
    const handleCloseForm = () => setShowModal(false)
    const handleOpenForm = () => setShowModal(true)

    return (
        <div
            className=" h-[224px] w-[384px] flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl  m-5 "
        >

            <div
                className={" h-[215px] w-[381px] rounded-xl bg-white hover:bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100 " +
                    (select && ' bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300  ')}>

                {accessConfig && <div className={`flex flex-row items-center justify-end `}>
                    <div
                        className={'mx-1 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 cursor-pointer   '}
                        onClick={handleOpenDeletedForm}
                    >
                        <Trash/>
                    </div>
                    <FormTeamDelete showModal={showModal} handleCloseForm={handleCloseForm} data={data}/>
                </div>}

                <div className={'cursor-pointer '} onClick={onClick}>

                    <div className={' flex justify-start items-end h-24 mx-5 '}>
                        {select && <Check size={7} className={' mr-2 text-orange-600 font-bold '}/>}
                        <input className=" text-xl font-bold text-gray-900 bg-transparent "
                               value={name}
                               onChange={(e) => handleChange(e)}
                               onKeyPress={handleKeyPress}
                        />
                    </div>


                    <div className={'p-1 m-2 ml-4 rounded-2xl border-[1px] w-80'}>
                        <div className={'ml-2 text-[10px] '}>You can:</div>
                        <div className={'flex flex-row flex-wrap'}>
                            {accessScheduleView &&
                                <div className={accessClass + ' bg-indigo-300 '}> view schedule</div>}
                            {accessScheduleEdit && <div className={accessClass + ' bg-pink-300 '}> edit schedule</div>}
                            {accessVacation && <div className={accessClass + ' bg-yellow-300 '}> edit vacation</div>}
                            {accessConfig && <div className={accessClass + ' bg-green-300 '}> edit config</div>}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TeamCard;