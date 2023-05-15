import React, {useEffect, useState} from 'react';
import FormInput from "../../../1_ui/formInput";
import FormButton from "../../../1_ui/formButton";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {createSchedule} from "../table/utils/createSchedule";
import {getConfigData} from "../../../store/trash/config";
import {getVacationData} from "../../../store/trash/vacations";
import scheduleService from "../../../servises/trash/schedules.service";
import {actionSchedule} from "../../../store/trash/schedules";
import {useNavigate} from "react-router-dom";

function FormScheduleCreate({showModal, handleCloseForm}) {
    const {data: config} = useSelector(getConfigData())
    const {data: vacations} = useSelector(getVacationData())

    const {register, handleSubmit, formState: {errors, isValid}, reset, setValue} = useForm({mode: "onBlur"})

    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 0)
    const newDate = initialDate.toISOString().slice(0, 7);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setValue("date", newDate);
        setValue("versionName", "Version ");
    }, [setValue]);


    const handleCreateNew = async (values) => {
        const {date, versionName} = values
        const [year, month] = date.split('-')

        const obj = {year: Number(year), month: Number(month)}
        // создаём новый график
        const scheduleContent = createSchedule({config, vacations, ...obj})
        handleCloseForm()

        const {content} = await scheduleService.createNew({versionName, ...obj, scheduleContent})
        const {_id: scheduleId} = content
        navigate(scheduleId)

        const newTitle = {
            _id: scheduleId,
            versionName: versionName,
            month: obj.month,
            year: obj.year,
            mainVersion: false,
        }
        dispatch(actionSchedule.addNewTitle(newTitle))
        toast('Schedule created in database')
    }


    return (
        <div
            className={`fixed bottom-0 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center z-20
            ${showModal ? ' block ' : ' hidden '}`}
        >
            <div className="fixed inset-0 transition-opacity " onClick={handleCloseForm}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
                className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all "
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div className={'flex flex-col mx-auto  px-7 pt-3 pb-5 rounded-3xl '}>
                    <div className={'text-gray-700 font-medium mb-2'}> Creating a new schedule</div>
                    <form onSubmit={handleSubmit(handleCreateNew)}>
                        <FormInput
                            errors={errors} register={register}
                            label={'Month'} keyName={'date'}
                            rules={{
                                required: "Required field",
                            }}
                            type={'month'}
                        />

                        <FormInput
                            errors={errors} register={register}
                            label={'Version name'} keyName={'versionName'}
                            rules={{
                                required: "Required field",
                            }}
                        />

                        <FormButton disabled={!isValid} name={'Create schedule'}/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormScheduleCreate;