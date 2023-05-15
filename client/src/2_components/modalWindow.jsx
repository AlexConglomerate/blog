import React from 'react';

function ModalWindow({className, children}) {
    return (

        <div
            className={className + ' bg-white mt-12 rounded-lg border-2 border-slate-700 flex flex-col items-center justify-evenly h-[270px] w-[250px] fixed [background-color: rgba(0,0,0,1)] '}>
            {children}
        </div>
    );
}

export default ModalWindow;