import {useDispatch, useSelector} from 'react-redux';
import {actionSchedule, getSchedules} from "../../../store/trash/schedules";

function useScheduleFilter() {
    const filterKeyword = useSelector(getSchedules());
    const dispatch = useDispatch();

    const setFilterKeyword = (keyword) => {
        const value = keyword !== 'All' ? keyword : null;
        dispatch(actionSchedule.setFilter(value));
    };

    return {filterKeyword, setFilter: setFilterKeyword};
}

export default useScheduleFilter
