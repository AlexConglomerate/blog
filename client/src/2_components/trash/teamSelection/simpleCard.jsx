import React from 'react';

function SimpleCard({text}) {
    return (
        <div
            className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl w-96 m-5 cursor-pointer ">
            <div
                className={" h-[220px] block rounded-xl bg-white p-6 sm:p-8 hover:bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100"}>
                <div className="mt-16 sm:pr-8">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default SimpleCard;