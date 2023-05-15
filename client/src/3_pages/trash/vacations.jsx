import React, {useEffect} from 'react';
import Table from "../../2_components/trash/table";
import TableControl from "../../2_components/trash/tableControl";
import {useDispatch, useSelector} from "react-redux";
import {actionVacations, activeSaveChangeVacation, getVacationData} from "../../store/trash/vacations";
import vacationService from "../../servises/trash/vacations.service";
import FormAddVacation from "../../2_components/trash/vacation/formAddVacation";

function Vacations() {
    const {data, idDeleteRows} = useSelector(getVacationData())

    // Отпуска: в виде буквы О, regular, educational, sick leave
    const arrType = ['O', 'R', 'E', 'S',]

    const config = [
        {fieldType: "input", value: 'name', headerName: 'Surname', type: 'text', readOnly: "readOnly"},
        {fieldType: "input", value: 'start', headerName: 'Start', type: 'date'},
        {fieldType: "input", value: 'end', headerName: 'End', type: 'date'},
        {fieldType: "select", value: 'type', headerName: 'Type', type: 'text', arr: arrType},
    ]

    return (
        <div className={' flex flex-col items-center '}>

            <TableControl
                name={'Vacation'}
                state={{data, idDeleteRows}}
                service={vacationService}
                reset={activeSaveChangeVacation}
            />

            <div className={'pt-28 pb-20'}>
                {<Table
                    config={config}
                    data={data}
                    action={actionVacations}
                    addendum={true}
                    addendumComponent={<FormAddVacation/>}
                />}
            </div>
        </div>
    )
}

export default Vacations;