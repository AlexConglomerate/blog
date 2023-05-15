import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import usersService from "../../servises/trash/users.service";
import {toast} from "react-toastify";
import Edit from "../../1_ui/icon/edit";
import {useDispatch, useSelector} from "react-redux";
import {actionUser, getUser} from "../../store/user";
import localStorageService from "../../servises/localStorage.service";

function Profile(props) {
    const {userId} = useParams()
    console.log(`userId`, userId)
    const [userInfo, setUserInfo] = useState();
    const yourId = localStorageService.getUserId()
    const access = yourId == userId

    const getUserInfo = async (userId) => {
        try {
            const {content} = await usersService.getUserInfo(userId)
            setUserInfo(content)
        } catch (error) {
            toast('Error')
        }
    }

    useEffect(() => {
        getUserInfo(userId)
        console.log(`777`, 777)
    }, []);

    const {name, email, telegramUserName: telegramUserNameStranger} = userInfo?.user || {}
    const {user} = useSelector(getUser())
    const {telegramUserName} = user || {}


    const border = ' border-[1px] border-black w-96 p-5 rounded-xl '

    const updateTelegramName = async () => {
        await usersService.updateTelegramUserName({telegramUserName, userId})
        toast('Telegram user name updated')
    }

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const value = e.target.value
        dispatch(actionUser.editTelegramUserName(value))
    }

    const buttonStyle = ' mx-1 rounded-lg px-3 py-1 py-0 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 '

    return (
        <>
            {userInfo && <div className=" p-4  flex flex-col gap-5">
                <h1 className="text-3xl font-bold mb-4">Profile of {name}</h1>
                <div className={border}>
                    <div className="text-xl font-bold mb-2">Email:</div>
                    {email}
                </div>
                <div className={border}>
                    <div className="text-xl font-bold mb-2">Telegram username</div>
                    <div className={' flex flex-row gap-3 '}>
                        {<input
                            className={'border-b-[1px] border-b-black w-56 '}
                            value={access ? telegramUserName : telegramUserNameStranger}
                            placeholder={'Add your telegram username'}
                            onChange={(e) => handleChange(e)}
                            readOnly={!access}

                        />}
                        {access &&
                            <>
                                <Edit/>
                                <button
                                    onClick={updateTelegramName}
                                    className={buttonStyle}>
                                    Save
                                </button>
                            </>
                        }
                    </div>
                    <div className={'text-stone-500'}> Communication bot: @schedule_ai_bot</div>
                </div>

                {userInfo.vacation.length > 0 && <>
                    <div className={border}>
                        <h2 className="text-xl font-bold mb-2">List of all vacation:</h2>
                        <ul className="list-disc list-inside">
                            {userInfo.vacation.map(item => (
                                <li key={item._id}>
                                    {item.start} - {item.end}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>}
            </div>}
        </>
    );

}

export default Profile;
