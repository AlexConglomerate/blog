import React from 'react';
import {buttonPressed, buttonStyle} from "../../../1_ui/style/style";
import useScheduleFilter from "./useScheduleFilter";


function FiltrationSection() {
    const filterValues = ['All', 'Teamlead', 'Senior'];
    const { filterKeyword, setFilter } = useScheduleFilter();

    return (
        <div>
            <div className={'flex space-x-4 rounded-lg border-2 border-slate-100'}>
                {filterValues.map((item) => (
                    <button
                        className={buttonStyle + (filterKeyword === item ? buttonPressed : '')}
                        key={item}
                        onClick={() => setFilter(item !== 'All' ? item : null)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FiltrationSection;
