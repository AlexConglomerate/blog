import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './index.css'
import {createStore} from "./store/createStore";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={createStore()}>
                <App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

