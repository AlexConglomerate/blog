import React from 'react';

function FormButton({disabled, name, className}) {
    const buttonStyle =
        ' rounded-lg px-4 py-2 mt-5 text-slate-700 font-medium w-full '
        + (!disabled ? ' bg-green-100 hover:bg-green-200 cursor-pointer ' : ' bg-slate-100 cursor-not-allowed ')
        + className
    return (
        <input
            value={name}
            className={buttonStyle}
            disabled={disabled}
            type={"submit"}
        />
    );
}

export default FormButton;