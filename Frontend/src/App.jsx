import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./Components/Pages/Signup/Signup";
import './App.scss';

const App = () => {

    return (

        <div className="app-container">
            <Routes>
                <Route path="/signup" element={ <Signup /> } />
            </Routes>
        </div>
    )
}

export default App;