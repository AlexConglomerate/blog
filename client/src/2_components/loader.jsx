import React from 'react';
import {BeatLoader} from "react-spinners";

function Loader({title}) {
    return (
        <div className={'text-2xl text-pink-500 mt-36 '}>
            <div className={'flex flex-row gap-24 '}>
                <BeatLoader size={30} speedMultiplier={0.5} color={'#eb4898'}/>
                {title}
                <BeatLoader size={30} speedMultiplier={0.5} color={'#eb4898'}/>
            </div>
        </div>
    )
}

export default Loader;