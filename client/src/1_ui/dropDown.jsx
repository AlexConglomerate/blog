import React, {useState} from 'react';
import Button from "./button";

function DropDown({list}) {
    const [selectedMonth, setSelectedMonth] = useState('Choose a schedule');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeElement, setActiveElement] = useState(null);
    const elementMenu = ' p-2 bg-white hover:bg-blue-100 cursor-pointer w-[150px] rounded-lg '
    const frame = ' border-2 bg-white rounded-lg border-slate-100 '

    const toggleMenuVisibility = () => setMenuOpen(!menuOpen)
    const handleMouseEnter = (menuItem) => setActiveElement(menuItem)
    const handleHiddenMenu = () => {
        setActiveElement(null)
        setMenuOpen(false)
    }

    return (
        <div className={'relative mx-auto w-max z-5'}>
            {/*Верхняя кнопка*/}
            <Button
                name={selectedMonth + ', ' + selectedVersion}
                // onClick={toggleMenuVisibility}
            />

            {/*Выпадающее меню*/}
            {menuOpen && (<div
                className={frame + 'absolute z-10'}
                onMouseLeave={handleHiddenMenu}
            >
                {
                    /*Главный список*/
                    list.map(item => (
                        <div className={elementMenu + ' relative  z-10 '}
                             onMouseEnter={() => handleMouseEnter(item.name)}
                        >{item.name}

                            {/*Второй список*/}
                            {item?.version && item.name == activeElement && (
                                <div className={frame + " absolute right-[-155px] top-0 z-10 "}>
                                    {item.version.map(subItem => (
                                        <div
                                            className={elementMenu}
                                            onClick={() => {
                                                setSelectedMonth(item.name)
                                                setSelectedVersion(subItem.name)
                                                toggleMenuVisibility()
                                            }}
                                        >
                                            {subItem.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                }</div>)
            }
        </div>
    );
}

export default DropDown