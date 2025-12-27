import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
    });

    const handleChange = (field, e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    // STEP 1: Send OTP
    const handleSendOtp = async () => {
        if (!formData.email.trim()) {
            alert("Email is required");
            return;
        }

        try {
            setIsLoading(true);

            const res = await api.post("/auth/forgot-password", {
                email: formData.email,
            });

            alert(res.data.message || "OTP sent to your email");
            setStep(2);

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to send OTP"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // STEP 2: Verify OTP & Reset Password
    const handleResetPassword = async () => {
        const { email, otp, newPassword } = formData;

        if (!otp.trim() || !newPassword.trim()) {
            alert("OTP and new password are required");
            return;
        }

        try {
            setIsLoading(true);

            const res = await api.post("/auth/reset-password", {
                email,
                otp,
                newPassword,
            });

            alert(res.data.message || "Password reset successful");
            navigate("/login");

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Password reset failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forget-container">
            <div className="forget-card">
                <h1>Forgot Password</h1>

                {step === 1 && (
                    <>
                        <p>Enter your registered email</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e)}
                        />
                        <button onClick={handleSendOtp} disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <p>Enter OTP & New Password</p>
                        <input
                            type="text"
                            placeholder="OTP"
                            value={formData.otp}
                            onChange={(e) => handleChange("otp", e)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={(e) => handleChange("newPassword", e)}
                        />
                        <button onClick={handleResetPassword} disabled={isLoading}>
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;