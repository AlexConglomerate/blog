// import React from 'react';
// import Table from "../../2_components/trash/table";
// import TableControl from "../../2_components/trash/tableControl";
// import { useSelector} from "react-redux";
// import {actionConfig, activeSaveChangeConfig, getConfigData,} from "../../store/config";
// import teamsService from "../../servises/trash/teams.service";
// import FormAddUser from "../2_components/teamConfiguration/formAddUser";
//
// function Config() {
//     const {data, idDeleteRows} = useSelector(getConfigData())
//
//     const positions = ['Teamlead', 'Senior', 'Junior', 'Boss', 'Engineer']
//     const arrShift = [1, 2, 3, 4]
//
//     const config = [
//         {fieldType: "input", value: 'name', headerName: 'Surname', type: 'text', readOnly: "readOnly"},
//         {fieldType: "select", value: 'position', headerName: 'Position', type: 'text', arr: positions},
//         {fieldType: "select", value: 'shift', headerName: 'Shift', type: 'number', arr: arrShift},
//         {fieldType: "input", value: 'salary', headerName: 'Salary', type: 'number',},
//
//         {fieldType: "checkbox", value: 'includeInSchedule', headerName: 'Include',},
//         {fieldType: "checkbox", value: 'accessScheduleView', headerName: 'Schedule view',},
//         {fieldType: "checkbox", value: 'accessScheduleEdit', headerName: 'Schedule edit',},
//         {fieldType: "checkbox", value: 'accessVacation', headerName: 'Vacation',},
//         {fieldType: "checkbox", value: 'accessConfig', headerName: 'Config',},
//     ]
//     return (
//         <div className={' flex flex-col items-center '}>
//
//             <TableControl
//                 name={'Team configuration'}
//                 state={{data, idDeleteRows}}
//                 service={teamsService}
//                 action={actionConfig}
//                 reset={activeSaveChangeConfig}
//             />
//
//             <div className={'pt-28 pb-20'}>
//                 {<Table
//                     config={config}
//                     data={data}
//                     action={actionConfig}
//                     addendum={true}
//                     addendumComponent={<FormAddUser/>}
//                 />}
//             </div>
//         </div>
//     );
// }
//
// export default Config;