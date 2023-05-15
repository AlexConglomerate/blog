import React from 'react';


function SelectedField({options, value, onChange, className}) {
    return (
            <select value={value} onChange={onChange} className={className + ' cursor-pointer '}>
                {options.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
    );
}

export default SelectedField;