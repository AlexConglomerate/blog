import {useLocation, useRoutes} from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./routes/navbar";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch} from "react-redux";
import {Helmet} from 'react-helmet';
import {getUserInfo} from "./store/user";


const App = () => {
    const location = useLocation()
    const element = useRoutes(routes(location))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
    }, []);


    return (
        <>
            <Helmet>
                <title>Blog</title>
            </Helmet>
            <Navbar/>
            <div className={'pt-12'}>
                {element}
            </div>
            <ToastContainer/>
        </>
    )
}
export default App;
