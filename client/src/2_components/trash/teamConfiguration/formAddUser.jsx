import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import FormButton from "../../1_ui/formButton";
import FormInputForTable from "../../1_ui/formInputForTable";
import teamsService from "../../servises/teams.service";
import localStorageService from "../../servises/localStorage.service";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {actionConfig} from "../../store/config";
import {classCell} from "../../1_ui/style/style";
import {getUser} from "../../store/user";
import {actionMembers} from "../../store/members";

function FormAddUser(props) {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors, isValid}, reset, setValue} = useForm({mode: "onBlur"})
    useEffect(() => {
        setValue("email", "alex@gmail.com");
    }, [setValue]);

    const {selectedTeam} = useSelector(getUser())

    const handleAddUser = async ({email}) => {
        try {
            const {teamId} = selectedTeam
            const {content} = await teamsService.addNewMember({email, teamId})
            const {name, userId, salary} = content
            const newMember = {[userId]: {name, userId, salary, email}}
            dispatch(actionMembers.addNewMembers(newMember))

            if (content?.message === "USER_DOES_NOT_EXIST") {
                toast.error(`There is no user with email ${email} in the system `)
                return
            }
            if (content?.message === "THIS_USER_IS_ALREADY_IN_A_TEAM") {
                toast.error(`${email} - this user is already in the team `)
                return
            }

            dispatch(actionConfig.addNewLine(content))

            // reset() // очистка формы после отправки
        } catch (error) {
            console.log(`error`, error)
            console.log(`ОШИБКА! ААААА!!!!`)
            // errorCatcher(error)
        }
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return (
        <form onSubmit={handleSubmit(handleAddUser)}>
            <div className={'flex flex-row'}>
                <FormInputForTable
                    classname={classCell + ' p-2 mb-0 w-72 '}
                    errors={errors}
                    register={register}
                    // label={'Email'}
                    keyName={'email'}
                    rules={{
                        required: "Required field",
                        pattern: {value: EMAIL_REGEXP, message: 'Invalid mail address'}
                    }}
                />
                <FormButton
                    disabled={!isValid} name={'Add user'}
                    className={' border-solid border border-indigo-600 hover:border-b-gray-900 -mt-0 w-[143px] h-[42px] '}
                />
            </div>
        </form>
    );
}

export default FormAddUser;