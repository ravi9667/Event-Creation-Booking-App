import jwt from "jsonwebtoken";
import { bookingUser } from "../../Models/bookingUsers.js";

export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).send({
                ok: false,
                message: "Email and OTP are required"
            });
        }

        const user = await bookingUser.findOne({ email });

        if (!user || user.loginOtp !== Number(otp)) {
            return res.status(400).send({
                ok: false,
                message: "Invalid OTP"
            });
        }

        if (user.loginOtpExpires < Date.now()) {
            return res.status(400).send({
                ok: false,
                message: "OTP expired"
            });
        }

        user.loginOtp = undefined;
        user.loginOtpExpires = undefined;
        await user.save();

        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).send({
            ok: true,
            message: "Login successful",
            token,
        });

    } catch (err) {
        console.error("OTP Verification Error:", err);
        return res.status(500).send({
            ok: false,
            message: "Internal Server Error",
        });
    }
};
