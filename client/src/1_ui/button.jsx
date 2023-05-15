import React from 'react';

function Button({name, onClick, className, ...rest}) {

    const buttonStyle = ' mx-1 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 '

    return (
        <button
            className={buttonStyle + className}
            onClick={onClick}
            {...rest}
        >
            {name}
        </button>
    );
}

export default Button;