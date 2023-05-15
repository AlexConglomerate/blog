import React from 'react';

function CheckboxField({className, value, onChange}) {
    return (
        <div className={className}>
            <input className={' w-full h-full hover:cursor-pointer text-slate-700 '}
                   type="checkbox"
                   checked={value}
                   onChange={onChange}
            />
        </div>

    );
}

export default CheckboxField;