import React, {useState} from 'react';
import {buttonStyle} from "../../../1_ui/style/style";
import Plus from "../../../1_ui/icon/plus";
import {useSelector} from "react-redux";
import {getSchedules} from "../../../store/trash/schedules";
import {getUser} from "../../../store/user";
import FormScheduleCreate from "./formScheduleCreate";
import {createScheduleName, prepareDropdownList} from "../table/utils/utils";
import {useNavigate} from "react-router-dom";

function ContextMenu() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseForm = () => setShowModal(false)
    const handleOpenForm = () => setShowModal(true)

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeElement, setActiveElement] = useState(null);

    const {listTitles: rowlistTitles, currentScheduleName} = useSelector(getSchedules())
    const selectedMonth = createScheduleName(currentScheduleName)
    const listTitles = prepareDropdownList(rowlistTitles)

    const {access} = useSelector(getUser())
    const {accessScheduleEdit} = access

    const toggleMenuVisibility = () => setMenuOpen(!menuOpen)
    const handleMouseEnter = (menuItem) => setActiveElement(menuItem)

    const handleHiddenMenu = () => {
        setActiveElement(null)
        setMenuOpen(false)
    }

    const handleForm = () => {
        setMenuOpen(false)
        handleOpenForm()
    }

    const navigate = useNavigate()
    const handleSelectMonth = async (item, subItem) => {
        toggleMenuVisibility()
        navigate(subItem.id)
    }

    const elementMenu = ' p-2 bg-white hover:bg-blue-100 cursor-pointer w-[150px] rounded-lg '
    const frame = ' border-2 bg-white rounded-lg border-gray-700   '

    return (
        <>
            <FormScheduleCreate showModal={showModal} handleCloseForm={handleCloseForm}/>

            <div className={'relative mx-auto w-max z-0'}>
                {/*Верхняя кнопка*/}
                <button onClick={toggleMenuVisibility} className={buttonStyle + ' text-black underline  '}>
                    {selectedMonth}
                </button>

                {/*Выпадающее меню*/}
                {menuOpen && (<div
                    className={frame + 'absolute '}
                    onMouseLeave={handleHiddenMenu}
                >
                    {accessScheduleEdit && <div
                        className={elementMenu + ' flex flex-row hover:bg-green-100 w-full '}
                        onClick={handleForm}
                    >
                        <div className={'mr-2 '}>Create new</div>
                        <Plus/>
                    </div>}
                    {listTitles &&
                        /*Главный список*/
                        listTitles.map(item => (
                            <div key={item.name}
                                 className={elementMenu + ' relative '}
                                 onMouseEnter={() => handleMouseEnter(item.name)}
                            >{item.name}
                                {/*Второй список*/}
                                {item?.version && item.name == activeElement && (
                                    <div className={frame + " absolute right-[-155px] top-0"}>
                                        {item.version.map(subItem => (
                                            <div key={subItem.id}
                                                 className={elementMenu}
                                                 onClick={() => handleSelectMonth(item, subItem)}
                                            >
                                                {subItem.name}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>)}
            </div>
        </>
    );
}

export default ContextMenu