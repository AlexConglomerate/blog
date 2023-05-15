import React from 'react';

function TextFrame({label, value, placeholder, type, onChange, className}) {
    return (
        <div>

            <div className="relative w-[150px]  ">
                <label className="absolute bg-white px-1 text-sm block text-gray-500 bottom-7 left-2 mb-1">
                    {label}
                </label>
                <div className="mt-1">
                    <input
                        // className={"border border-gray-300 focus:outline-blue-400 rounded w-full h-10 p-3 pt-5 text-sm " + className}
                        className={"flex space-x-4 rounded-lg border-2 border-slate-100 focus:outline-blue-400 w-full h-10 p-3 pt-5  text-sm " + className}
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        type={type}
                    />
                </div>
            </div>

        </div>
    );
}

export default TextFrame;