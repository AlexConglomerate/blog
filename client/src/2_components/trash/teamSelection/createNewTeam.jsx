import React from 'react';
import FormInput from "../../1_ui/formInput";
import FormButton from "../../1_ui/formButton";
import {useForm} from "react-hook-form";
import localStorageService from "../../servises/localStorage.service";
import {useDispatch} from "react-redux";
import {setListTeam} from "../../store/listTeam";
import teamsService from "../../servises/teams.service";

function CreateNewTeam({toggle}) {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({mode: "onBlur"})

    const handleAddTeam = async ({name}) => {
        const userId = localStorageService.getUserId() // Получаем текущего юзера
        // const {content} = await teamNamesService.add({name, userId}) // Создаём команду
        const {content} = await teamsService.createNewTeam({name, userId}) // Создаём команду
        reset() // очистка формы после отправки
        dispatch(setListTeam()) // Заново подгружаем все команды
        toggle(prev => !prev) // Закрываем карточку
    }

    return (
        <div className={'w-80 ml-6 '}>
            <form onSubmit={handleSubmit(handleAddTeam)}>
                <FormInput
                    errors={errors} register={register}
                    label={'Team name'} keyName={'name'}
                    rules={{required: "Required field",}}
                />
                <FormButton disabled={!isValid} name={'Create a team'}/>
            </form>

        </div>
    );
}

export default CreateNewTeam;