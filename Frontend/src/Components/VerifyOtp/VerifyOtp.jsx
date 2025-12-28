import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Api"
import Loader from "../Loader/Loader";
import "./VerifyOtp.scss";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem("loginEmail");

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            setError("OTP is required");
            alert("OTP is required");
            return;
        }

        try {
            setIsLoading(true);

            const res = await api.post("/auth/verify-otp", {
                email,
                otp,
            });

            // JWT save after OTP verification
            localStorage.setItem("token", res.data.token);

            // cleanup
            localStorage.removeItem("loginEmail");

            alert("Login successful");
            navigate("/events");

        } catch (err) {
            console.error("OTP Error:", err);
            alert(
                err.response?.data?.message ||
                "Invalid or expired OTP"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className="otp-container">
                <div className="otp-card">
                    <h1>Verify OTP</h1>
                    <p>
                        Please enter the OTP sent to
                        <span className="email"> {email}</span>
                    </p>

                    <input
                        type="text"
                        className="otp-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                        className="verify-btn"
                        onClick={handleVerifyOtp}
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>
            </div>
        )
    );
};

export default VerifyOtp;