import React, { useState } from "react";
import illustration from '../../../assets/illustration.png';
import logo from "../../../assets/electronics-arts.png";
import emailIcon from "../../../assets/mail.png";
import passIcon from "../../../assets/padlock.png";
import hide from "../../../assets/hide.png";
import show from "../../../assets/eye.png";
import "./Login.scss";

const Login = () => {
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
        const { email, password} = loginFormData;

        if ( !email.trim() || !password.trim() ) {
            setError("All fields are required");
            alert(error)
            return;
        }

        try {
            const data = await postRequest("http://127.0.0.1:6060/api/auth/login", loginFormData);

            console.log("login Response:", data);

            if (data.ok) {
                localStorage.setItem("token", data.token);
                alert("Signup Successful!");
                navigate("/login");
            } else {
                setError(data.message || "login failed");
            }

        } catch (err) {
            console.error("login Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

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
                        <img src={emailIcon} alt="Email-icon" />
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
                        <img src={passIcon} alt="Password-icon" />
                        <input
                            type="password"
                            className="input"
                            placeholder=" "
                            required
                            value={loginFormData.password}
                            onChange={(e) => handleFormInput("password", e)}
                        />
                        <label htmlFor="">Password</label>
                    </div>
                </div>
                <div className="btn-box">
                    <button className="forget-password">Forget Password</button>
                    <button className="login-btn">Login</button>
                    <p>Don't have an account ? <button>Signup</button> </p>
                </div>
            </div>
            <div className="login-bg">
                <img src={illustration} alt="login-side-image" />
            </div>
        </div>
    )
}

export default Login;