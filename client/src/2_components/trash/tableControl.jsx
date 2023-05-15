import React from 'react';
import {buttonStyle} from "../../1_ui/style/style";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";


const TableControl = ({name, state, service, action, reset}) => {
    const dispatch = useDispatch()
    const {data, idDeleteRows} = state

    const handleSaveChange = async () => {
        try {
            // Проверка на то, заполнены ли поля
            const checkСompleteness = data.some(item => (item.start === '' || item.end === ''))
            if (checkСompleteness) {
                toast('Fill in all fields with dates')
                return
            }

            // Берём все объекты, у которых есть edit === true
            const editArrRaw = data.filter(item => (item?.edit === true && item?.post !== true))
            // Удаляем из объекта некоторые поля createdAt, updatedAt, __v, edit,
            const editArr = editArrRaw.map(obj => {
                const {createdAt, updatedAt, __v, edit, ...rest} = obj;
                return rest;
            });


            // Берём все объекты, у которых есть post === true
            const postArrRaw = data.filter(item => item?.post === true)
            // Удаляем из объекта поля _id, name, // Хм, а нужно ли удалять?
            const postArr = postArrRaw.map(obj => {
                const {_id, name, ...rest} = obj;
                return rest;
            });

            // Поля для удаления
            const deleteArr = idDeleteRows

            // сохраняем данные на сервере
            const {content} = await service.saveChange({editArr, deleteArr, postArr})
            if (content === '') toast("Saved to database!")

        } catch (e) {
            toast('Data not loaded')
        }

    }

    function handleReset() {
        dispatch(reset())
    }

    return (
        <div
            className={' flex flex-row items-center justify-center bg-white -bg-yellow-200 mb-5 p-5 w-full fixed '}>
            <div
                className='  flex flex-row items-center justify-between -bg-blue-400 w-[500px] '>
                <div className=' text-3xl text-red-800 my-3 '> {name}</div>
                <div className=' border-2 border-slate-100  rounded-lg '>
                    <button className={buttonStyle} onClick={handleSaveChange}>Save</button>
                    <button className={buttonStyle} onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default TableControl;
