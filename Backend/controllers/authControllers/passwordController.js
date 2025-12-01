import crypto from "crypto";
import bcrypt from "bcryptjs";
import { bookingUser } from "../../Models/bookingUsers.js";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await bookingUser.findOne({ email });

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpires = Date.now() + 15 * 60 * 1000;

        user.passwordResetToken = resetToken;
        user.passwordResetTokenExpires = tokenExpires;
        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendVerificationEmail(email, `Click to reset: ${resetLink}`);

        return res.status(200).send({
            ok: true,
            message: "Reset link sent to email"
        });

    } catch (err) {
        console.error("Forgot pwd error:", err);
        return res.status(500).send({ ok: false, message: "Internal Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await bookingUser.findOne({
            passwordResetToken: token,
            passwordResetTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send({
                ok: false,
                message: "Invalid or expired token"
            });
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        user.password = hashed;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save();

        return res.status(200).send({
            ok: true,
            message: "Password reset successfully"
        });

    } catch (err) {
        console.error("Reset pwd error:", err);
        return res.status(500).send({ ok: false, message: "Internal Error" });
    }
};
