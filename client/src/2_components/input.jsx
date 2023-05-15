import React, {useState} from 'react';

function Input() {
    const [table, setTable] = useState([[111, 222], [333, 444]])

    const handleChangeCell = ({target}) => {
        const newArr = [...table]
        newArr[0][0] = target.value
        setTable(newArr)
    }

    return (
        <div className={'border-2'}>
            <input
                value={table[0][0]}
                onChange={(e) => handleChangeCell(e)}
            />
        </div>
    );
}

export default Input;