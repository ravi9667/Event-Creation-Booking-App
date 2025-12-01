import { BookingUser } from "../Models/bookingUsers.js";

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).send({
                ok: false,
                message: "Token is required"
            });
        }

        // Find user whose token matches and token is not expired
        const user = await bookingUser.findOne({
            emailVerificationToken: token,
            emailVerificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send({
                ok: false,
                message: "Invalid or expired token"
            });
        }

        // Update user verification status
        user.isEmailVerification = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpires = undefined;

        await user.save();

        return res.status(200).send({
            ok: true,
            message: "Email Verified Successfully. You can now login."
        });

    } catch (err) {
        console.error("Email Verification Error:", err);
        return res.status(500).send({
            ok: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};