import React from 'react';
import {nanoid} from 'nanoid'

function SelectedName({options, value, onChange, className}) {
    const selectKey = nanoid()

    return (
        <select key={selectKey} value={value} onChange={onChange} className={className + ' cursor-pointer '}>
            {options.map(item => (
                <option
                    key={item.name}
                    value={item.name}
                    user_id={item.userId}
                >
                    {item.name}
                </option>
            ))}
        </select>
    )
}

export default SelectedName;