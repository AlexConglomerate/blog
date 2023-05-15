import React from 'react';
import workers from "../api/workers";
import DropDown from "../../1_ui/dropDown";


function DropdownEmployees() {
    const employes = workers

    const employesList = employes.reduce((acc, item) => {
        const a = {name: item.surname, id: item.id,}
        acc.push(a)
        return acc
    }, [])

    return (
        <div>
            <DropDown list={employesList}/>
        </div>
    );
}

export default DropdownEmployees;