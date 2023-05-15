import React, {useState} from 'react';
import DatePicker from "react-datepicker";


function SelectedDate({options, value, onChange, className}) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate} onChange={(date) => setStartDate(date)}/>
    );
}

export default SelectedDate;