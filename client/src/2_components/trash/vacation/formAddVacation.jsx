import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import SelectedName from "../../../1_ui/selectedName";
import {classCell} from "../../../1_ui/style/style";
import {actionVacations} from "../../../store/trash/vacations";
import localStorageService from "../../../servises/localStorage.service";
import {nanoid} from 'nanoid'
import {getMembers} from "../../../store/trash/members";


function FormAddVacation() {
    const dispatch = useDispatch()

    // Забираем список участников команды
    const {members} = useSelector(getMembers())

    const [state, setState] = useState('Select');

    const handleChange = ({target}) => {
        const userId = target.selectedOptions[0].getAttribute('user_id')
        const name = target.value
        setState(name)
        setState('Select')

        const teamId = localStorageService.getTeamId()
        const content = {
            _id: nanoid(), // потом это поле удаляется, когда отправляем на бекенд
            teamId,
            userId,
            name,
            post: true,
            start: "",
            end: "",
            type: "O",
        }
        dispatch(actionVacations.addNewLine(content))
    }


    return (
        <>
            {members && <SelectedName
                onChange={(e) => handleChange(e)}
                options={Object.values(members)}
                value={state}
                className={classCell + ' w-36 '}
            />}
        </>
    )
}

export default FormAddVacation;