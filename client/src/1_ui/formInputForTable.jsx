import React from 'react';

function FormInputForTable({label, errors, register, keyName, rules, classname}) {
    return (
        <div className={' ' }>
            <label className="block text-gray-700 font-medium ">
                {label}
            </label>
            <input
                className={classname}
                {...register(keyName, rules)}
            />
            <div className={'text-red-800'}>{errors?.[keyName] && (errors?.[keyName]?.message || 'Error')}</div>
        </div>
    )
}

export default FormInputForTable;