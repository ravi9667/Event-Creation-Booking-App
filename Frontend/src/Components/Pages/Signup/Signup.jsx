import React from "react";
import logo from "../../.././assets/electronics-arts.png";
import userIcon from "../../.././assets/user.png";
import emailIcon from "../../.././assets/mail.png";
import dobIcon from "../../.././assets/calendar.png";
import passIcon from "../../.././assets/padlock.png";
import hide from "../../.././assets/hide.png";
import show from "../../.././assets/eye.png";
import illustration from "../../.././assets/login-illustration.png";
import "./Signup.scss";

const Signup = () => {

    return (
        <div className="signup-container">
            <div className="signup-main">
                <div className="signup-card">
                    {/* Logo Section */}
                    <div className="app-brand">
                        <img src={logo} alt="App Logo" width={40} height={40} />
                        <h1 className="app-title">Evently</h1>
                    </div>

                    {/* Heading Section */}
                    <div>
                        <h1>Create Account</h1>
                        <p>Join Evently to explore and create events</p>
                    </div>

                    {/* NAME */}
                    <div className="input-group group-1">
                        <img src={userIcon} alt="" className="input-icon" />
                        <input
                            type="text"
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("name", e)}
                            value={formData.name}
                        />
                        <label>Full Name</label>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="input-group group-1">
                        <img src={dobIcon} alt="" className="input-icon" />
                        <input
                            type="date"
                            className="input dob-input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("dateOfBirth", e)}
                            value={formData.dateOfBirth}
                        />
                        <label className="dob-label">Date of Birth</label>
                    </div>

                    {/* EMAIL */}
                    <div className="input-group group-1">
                        <img src={emailIcon} alt="" className="input-icon" />
                        <input
                            type="email"
                            className="input"
                            required
                            placeholder=" "
                            autoComplete="email"
                            onChange={(e) => handleFormInput("email", e)}
                            value={formData.email}
                        />
                        <label>Email</label>
                    </div>

                    {/* PASSWORD */}
                    <div className="input-group group-2">
                        <img src={passIcon} alt="" className="password-icon" />
                        <input
                            type={isPasswordHidden ? "password" : "text"}
                            className="input"
                            required
                            placeholder=" "
                            autoComplete="new-password"
                            onChange={(e) => handleFormInput("password", e)}
                            value={formData.password}
                        />
                        <label>Password</label>

                        {formData.password.trim().length > 0 ? (
                            <img
                                src={isPasswordHidden ? hide : show}
                                alt="toggle"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                                className="showIcon"
                            />
                        ) : null}
                    </div>

                    {/* ROLE SELECTION */}
                    <div className="input-group group-1">
                        <select
                            className="input role-select"
                            onChange={(e) => handleFormInput("role", e)}
                            value={formData.role}
                        >
                            <option value="creator">Creator</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        <label className="role-label">Select Role</label>
                    </div>

                    {/* BUTTON */}
                    <button onClick={handleSignup}>Sign Up</button>

                    <p>
                        Already have an account?
                        <button onClick={() => navigate("/login")}>Sign In</button>
                    </p>
                </div>
            </div>

            {/* Background Illustration */}
            <div className="signup-bg">
                <img src={illustration} alt="" className="signup-illustrations" />
            </div>
        </div>
    )
}

export default Signup;