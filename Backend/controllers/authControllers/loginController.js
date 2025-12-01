import bcrypt from "bcryptjs";
import { bookingUser } from "../../Models/bookingUsers.js";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                ok: false,
                message: "Email and Password are required !!"
            });
        }

        const user = await bookingUser.findOne({ email });
        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "User not found, Email isn't registered !!"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                ok: false,
                message: "Password is incorrect"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user.loginOtp = otp;
        user.loginOtpExpires = otpExpires;
        await user.save();

        await sendVerificationEmail(email, `Your Login OTP is: ${otp}`);

        return res.status(200).send({
            ok: true,
            message: "OTP sent to your email. Please verify."
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).send({
            ok: false,
            message: "Internal server error",
        });
    }
};
