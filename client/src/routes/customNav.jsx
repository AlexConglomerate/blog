import React from 'react';
import {NavLink} from "react-router-dom";
import {buttonStyle, buttonPressed} from "../1_ui/style/style";

function CustomNav({name, to}) {
    const classNavLink = ({isActive}) => isActive ? buttonStyle + buttonPressed : buttonStyle
    return (
        <NavLink
            className={classNavLink}
            to={to}
            end
        >
            {name}
        </NavLink>
    )
}

export default CustomNav;