import React, {useState} from 'react';
import LogIn from "../2_components/auth/logIn";
import SignUp from "../2_components/auth/signUp";
import Check from "../1_ui/icon/check";


function Auth(props) {
    const [log, setLog] = useState(true);
    const classButton = ' cursor-pointer bg-blue-100 hover:bg-blue-300 flex flex-row justify-center items-center gap-2 rounded-1xl '

    const handleToggle = () => {
        setLog(prev => !prev)
    }
    return (
        <div className={'grid grid-cols-2 grid-rows-2 gap-2 mx-auto w-96 m-10 '}
             style={{gridTemplateRows: "40px"}}
        >
            <div className={classButton} onClick={handleToggle}>
                {log && <Check/>} Login
            </div>

            <div className={classButton} onClick={handleToggle}>
                {!log && <Check/>} Register
            </div>

            <div className={' col-span-2'}>
                {log ? <LogIn/> : <SignUp/>}
            </div>
        </div>
    )
}

export default Auth;