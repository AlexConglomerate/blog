import React, {useState} from 'react';
import Up from "../../1_ui/icon/up";
import Down from "../../1_ui/icon/down";
import Trash from "../../1_ui/icon/trash";
import SelectedField from "../../1_ui/selectedField";
import CheckboxField from "../../1_ui/checkboxField";
import {useDispatch} from "react-redux";
import {orderBy} from "lodash";
import {ScaleLoader} from "react-spinners";
import {classCell, linkStyle} from "../../1_ui/style/style";
import {useNavigate} from "react-router-dom";


export const Table = ({config, data, action, addendumComponent, colDelete = true, addendum = false}) => {
        const navigate = useNavigate()
        const {deleteRow, editRow, updateState} = action
        const dispatch = useDispatch()
        const classHeader = ' cursor-pointer bg-blue-100 '
        const smallWidth = ' w-10 '
        const bigWidth = ' w-36 '
        const wCheckBox = ' w-14 w-[56px] text-[8px] font-bold '

        const [sortBy, setSortBy] = useState({value: "name", order: "asc"});

        const handleChange = (index, subItem, e, item) => {
            const editItem = {...item}

            e.target.type === 'checkbox'
                ? editItem[subItem] = !item[subItem]
                : editItem[subItem] = e.target.value

            dispatch(editRow(editItem))
        }

        const handleDelete = item => dispatch(deleteRow(item))


        const sort = (nameColumn) => {
            let turn = 'asc'
            if (nameColumn === sortBy.value) turn = sortBy.order === turn ? "desc" : turn

            const sorted = orderBy(data, [nameColumn], [turn])
            dispatch(updateState(sorted))
            setSortBy({value: nameColumn, order: turn})
        }

        const handleClickName = (item) => {
            if (item?.readOnly && item.value === 'name') {
                navigate('/', {replace: false})
            }
        }


        if (!data) return (<ScaleLoader size={50} color={"#eb4898"}/>)

        return (
            <div>
                <div className={'flex flex-row border-b-2 border-blue-900 -fixed bg-white'}>
                    {/*формируем шапку*/}
                    {config.map(item => (
                        <div
                            className={classCell + classHeader + (item.fieldType == 'checkbox' ? wCheckBox + 'p-0' : bigWidth)}
                            style={{wordBreak: 'break-all'}}
                            onClick={() => sort(item.value)}
                            key={item.value + item.header}
                        >
                            <div className={'flex flex-row justify-between pl-0.5 item-center '}>
                                {item.headerName}
                                {sortBy.value === item.value && (sortBy.order === 'asc' ? <Down/> : <Up/>)}
                            </div>
                        </div>
                    ))}
                    <div className={classCell + smallWidth + classHeader}>
                        <Trash/>
                    </div>
                </div>
                <div className={'-pt-10'}>
                    {/*формируем основную таблицу*/}
                    {data.map((item, index) => {
                        return (
                            <div key={index + item._id}
                                 className={"flex flex-row "}>
                                {config.map(subItem => (
                                    // eslint-disable-next-line no-undef
                                    <React.Fragment key={subItem.value + index}>
                                        {subItem.fieldType === 'select' &&
                                            <SelectedField
                                                value={data[index][subItem.value]}
                                                onChange={(e) => handleChange(index, subItem.value, e, item)}
                                                className={classCell + bigWidth}
                                                options={subItem.arr}
                                            />}

                                        {subItem.fieldType === 'input' &&
                                            <input
                                                value={data[index][subItem.value]}
                                                onChange={(e) => handleChange(index, subItem.value, e, item)}
                                                className={classCell + bigWidth +
                                                    (subItem.value === 'name' && linkStyle) +
                                                    (subItem?.readOnly && ' cursor-pointer ')}
                                                type={subItem.type}
                                                readOnly={subItem?.readOnly ? ' readOnly ' : false}
                                                onClick={() => subItem.value === 'name' && navigate('/profile/' + item.userId, {replace: false})}
                                            />
                                        }
                                        {subItem.fieldType === 'date' &&
                                            <input
                                                value={data[index][subItem.value]}
                                                onChange={(e) => handleChange(index, subItem.value, e, item)}
                                                className={classCell + bigWidth + (subItem?.readOnly ? ' cursor-pointer ' : "")}
                                                type={subItem.type}
                                                readOnly={subItem?.readOnly ? ' readOnly ' : false}
                                            />
                                        }
                                        {subItem.fieldType === 'checkbox' &&
                                            <CheckboxField
                                                value={data[index][subItem.value]}
                                                className={classCell + wCheckBox}
                                                onChange={(e) => handleChange(index, subItem.value, e, item)}
                                            />
                                        }
                                    </React.Fragment>
                                ))}


                                {colDelete && <div
                                    className={classCell + smallWidth + ` cursor-pointer hover:bg-blue-100 `}
                                    onClick={() => handleDelete(item)}
                                >
                                    <Trash/>
                                </div>
                                }
                            </div>

                        )
                    })
                    }

                    {addendum && addendumComponent}

                </div>
            </div>
        );
    }
;

export default Table;