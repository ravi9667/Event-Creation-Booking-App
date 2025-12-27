import React, { useState } from "react";
import illustration from '../../../assets/illustration.png';
import logo from "../../../assets/electronics-arts.png";
import emailIcon from "../../../assets/mail.png";
import passIcon from "../../../assets/padlock.png";
import hide from "../../../assets/hide.png";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api";
import show from "../../../assets/eye.png"
import "./Login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState("");
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    });
    console.log(loginFormData)

    const handleFormInput = (field, event) => {
        setLoginFormData({ ...loginFormData, [field]: event.target.value });
    };
   
    const handlelogin = async () => {
    const { email, password } = loginFormData;

    if (!email.trim() || !password.trim()) {
        setError("All fields are required");
        alert("All fields are required");
        return;
    }

    try {
        setIsLoading(true);

        const res = await api.post("/auth/login", {
            email,
            password
        });

        // backend should send: { message: "OTP sent" }
        alert(res.data.message || "OTP sent to your email");

        // OTP verify ke liye email save
        localStorage.setItem("loginEmail", email);

        // OTP page
        navigate("/verify-otp");

    } catch (err) {
        console.error("login Error:", err);
        alert(
            err.response?.data?.message ||
            "Login failed. Please try again."
        );
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="login-container">
            <div className="login-main">
                <div className="app-brand">
                    <img src={logo} alt="app-brand-logo" width={40} height={40} />
                    <h1 className="app-title">Evently</h1>
                </div>
                <div className="login-headings">
                    <h1>Login</h1>
                    <p>Login Evently to explore and create, Book events</p>
                </div>
                <div className="inputs-wrapper">
                    <div className="input-group">
                        <img src={emailIcon} alt="Email-icon" className="img" />
                        <input
                            type="text" 
                            className="input"
                            placeholder=" "
                            required
                            value={loginFormData.email}
                            onChange={(e) => handleFormInput("email", e)}
                        />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="input-group">
                        <img src={passIcon} alt="Password-icon" className="img" />
                        <input
                            type={isPasswordHidden ? "password" : "text" }
                            className="input"
                            placeholder=" "
                            required
                            value={loginFormData.password}
                            onChange={(e) => handleFormInput("password", e)}
                        />
                        <label htmlFor="">Password</label>
                        {loginFormData.password.length > 0 && (
                            <img
                                src={isPasswordHidden ? hide : show}
                                className="showIcon"
                                alt="toggle"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            />
                        )}
                    </div>
                </div>
                <div className="btn-box">
                    <button className="forget-password">Forget Password</button>
                    <button className="login-btn" onClick={handlelogin} disabled={isLoading}>Login</button>
                    <p>Don't have an account ? <button onClick={navigate("/signup")}>Signup</button> </p>
                </div>
            </div>
            <div className="login-bg">
                <img src={illustration} alt="login-side-image" />
            </div>
        </div>
    )
}

export default Login;
