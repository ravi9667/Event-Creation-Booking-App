import React, { useState } from "react";
import logo from "../../.././assets/electronics-arts.png";
import userIcon from "../../.././assets/user.png";
import emailIcon from "../../.././assets/mail.png";
import dobIcon from "../../.././assets/calendar.png";
import passIcon from "../../.././assets/padlock.png";
import hide from "../../.././assets/hide.png";
import show from "../../.././assets/eye.png";
import illustration from "../../.././assets/illustration.png";
import { postRequest } from "../../../apiRoutes";
import "./Signup.scss";

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState("");
    const [signupFormData, setSignupFormData] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        role: ""
    });

    const handleFormInput = (field, event) => {
        setSignupFormData({ ...signupFormData, [field]: event.target.value });
    };

    const handleSignup = async () => {
        const { name, email, password, dateOfBirth, role } = signupFormData;

        if ( !name.trim() || !email.trim() || !password.trim() || !dateOfBirth.trim() || !role.trim() ) {
            setError("All fields are required");
            alert(error)
            return;
        }

        try {
            const data = await postRequest("http://127.0.0.1:6060/api/auth/signup", signupFormData);

            console.log("Signup Response:", data);

            if (data.ok) {
                localStorage.setItem("token", data.token);
                alert("Signup Successful!");
                navigate("/login");
            } else {
                setError(data.message || "Signup failed");
            }

        } catch (err) {
            console.error("Signup Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-main">
                <div className="signup-card">
                    <div className="app-brand">
                        <img src={logo} alt="App Logo" width={40} height={40} />
                        <h1 className="app-title">Evently</h1>
                    </div>

                    <div>
                        <h1>Create Account</h1>
                        <p>Join Evently to explore and create events</p>
                    </div>

                    <div className="inputs-wrapper">
                        <div className="left-column">
                            <div className="input-group group-1">
                                <img src={userIcon} alt="" className="input-icon" />
                                <input
                                    type="text"
                                    className="input"
                                    placeholder=" "
                                    required
                                    value={signupFormData.name}
                                    onChange={(e) => handleFormInput("name", e)}
                                />
                                <label>Full Name</label>
                            </div>

                            <div className="input-group group-1">
                                <img src={emailIcon} alt="" className="input-icon" />
                                <input
                                    type="email"
                                    className="input"
                                    placeholder=" "
                                    required
                                    value={signupFormData.email}
                                    onChange={(e) => handleFormInput("email", e)}
                                />
                                <label>Email</label>
                            </div>
                            <div className="role-radio-group">
                                <p className="radio-title">Select Role</p>
                                <div className="radio-selectors">
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="creator"
                                            checked={signupFormData.role === "creator"}
                                            onChange={(e) => handleFormInput("role", e)}
                                        />
                                        Creator
                                    </label>
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="viewer"
                                            checked={signupFormData.role === "viewer"}
                                            onChange={(e) => handleFormInput("role", e)}
                                        />
                                        Viewer
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="input-group group-1">
                                <img src={dobIcon} alt="" className="input-icon" />
                                <input
                                    type="date"
                                    className="input dob-input"
                                    placeholder=" "
                                    required
                                    value={signupFormData.dateOfBirth}
                                    onChange={(e) => handleFormInput("dateOfBirth", e)}
                                />
                                <label className="dob-label">Date of Birth</label>
                            </div>

                            <div className="input-group group-2">
                                <img src={passIcon} alt="" className="password-icon" />
                                <input
                                    type={isPasswordHidden ? "password" : "text"}
                                    className="input"
                                    placeholder=" "
                                    required
                                    value={signupFormData.password}
                                    onChange={(e) => handleFormInput("password", e)}
                                />
                                <label>Password</label>

                                {signupFormData.password.length > 0 && (
                                    <img
                                        src={isPasswordHidden ? hide : show}
                                        className="showIcon"
                                        alt="toggle"
                                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
                        <p className="already">
                            Already have an account?
                            <button>Sign In</button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="signup-bg">
                <img src={illustration} alt="" className="signup-illustrations" />
            </div>
        </div>
    );
};

export default Signup;
