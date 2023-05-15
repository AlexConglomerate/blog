import React from 'react';
import FormInput from "../../../1_ui/formInput";
import FormButton from "../../../1_ui/formButton";

function ModalWindow({showModal, handleCloseForm, children}) {
    return (
        <div
            className={`fixed bottom-0 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center z-20
            ${showModal ? ' block ' : ' hidden '}`}
        >
            <div className="fixed inset-0 transition-opacity " onClick={handleCloseForm}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
                className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all "
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;