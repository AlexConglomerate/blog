import React, {useEffect} from 'react';
import {ScaleLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import TeamCard from "./teamCard";
import ToggleCard from "./toggleCard";
import {getUser} from "../../store/user";
import {getListTeams, setListTeam} from "../../store/listTeam";
import SimpleCard from "./simpleCard";
import {completeRedux} from "../schedule/table/utils/completeRedux";


function TeamsList(props) {
    const {selectedTeam} = useSelector(getUser())
    const dispatch = useDispatch()
    const {teamsList} = useSelector(getListTeams())

    useEffect(() => {
        dispatch(setListTeam())
    }, [])

    // Обрабатываем нажатие на одну из команд (т.е. фиксируем выбор команды)
    const handleChoiceTeam = async (team) => {
        const {teamId} = team
        if (selectedTeam?.teamId !== teamId) {
            await completeRedux(teamId, dispatch)
        }
    }

    return (
        <div>
            <div className={'flex flex-col'}>
                <div className={'flex flex-row flex-wrap '}>
                    <ToggleCard/>

                    {/* Выводим список команд*/}
                    {teamsList &&
                        teamsList.map(item => {
                            const select = selectedTeam ? (selectedTeam.teamId === item.teamId ? true : false) : false
                            return (
                                <React.Fragment key={item._id}>
                                    <TeamCard
                                        select={select}
                                        data={item}
                                        onClick={() => handleChoiceTeam(item)}
                                    />
                                </React.Fragment>
                            )
                        })
                    }

                    {/* Показываем Loading, пока команды загружаются с сервера*/}
                    {!teamsList &&
                        <div className={'flex flex-col items-center ml-10 my-16 gap-5 '}>
                            <ScaleLoader size={50} color={"#eb4898"}/>
                            <div> Downloading your teams</div>
                        </div>
                    }

                    {/* Указываем, что писать, если человека нет ни в одной команде */}
                    {teamsList && teamsList.length === 0 &&
                        <SimpleCard text={`You don't have commands. Create a team yourself! 😉 `}/>
                    }

                </div>
            </div>
        </div>
    );
}

export default TeamsList;