import React, {useState} from 'react';
import Plus from "../../1_ui/icon/plus";
import CreateNewTeam from "./createNewTeam";

function ToggleCard() {
    const [state, setState] = useState(false);
    return (
        <div
            className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl w-96 m-5 cursor-pointer "
        >
            {!state &&
                <div
                    onClick={() => setState(prev => !prev)}
                    className="block rounded-xl bg-white p-6 sm:p-8 hover:bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100 ">
                    <div className={'h-[155px] flex flex-col justify-center items-center mx-auto sm:pr-8'}>
                        <Plus size={10}/>
                        <div>Create new team</div>
                    </div>
                </div>
            }
            {state &&
                <div
                    className="block rounded-xl bg-white h-[220px] p-6 sm:p-8">
                    <div className={' flex flex-col justify-center items-center mx-auto sm:pr-8'}>
                        <CreateNewTeam toggle={setState}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default ToggleCard;