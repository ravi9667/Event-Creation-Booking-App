import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import Events from "./Components/Pages/Events/Event";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import VerifyOtp from "./Components/VerifyOtp/VerifyOtp";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import './App.scss';

const App = () => {

    return (
        <div className="app-container">
            <Routes>
                <Route
                    path='/signup'
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route path="/events" element={<Events />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
        </div>
    )
}

export default App;