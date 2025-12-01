import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { bookingUser } from "../../Models/bookingUsers";
import { sendVerificationEmail } from "../../utils/sendEmail";

export const signup = async (req, res) => {
    try {
        const { name, dateOfBirth, email, password, role } = req.body;

        if (!name || !dateOfBirth || !email || !password || !role) {
            return res.status(400).send({
                ok: false,
                message: "All Fields are Required !!"
            });
        }

        if (!["creator", "viewer"].includes(role)) {
            return res.status(400).send({
                ok: false,
                message: "Invalid Role Selected"
            });
        }

        const existedUser = await bookingUser.findOne({ email });
        if (existedUser) {
            return res.status(409).send({
                ok: false,
                message: "Email Already Registered !!"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const emailToken = crypto.randomBytes(32).toString("hex");
        const emailTokenExpire = Date.now() + 15 * 60 * 1000; // 15 mins

        const user = await bookingUser.create({
            name,
            dateOfBirth,
            email,
            password: hashed,
            role,
            emailVerificationToken: emailToken,
            emailVerificationTokenExpires: emailTokenExpire,
        });

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const verifyLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;
        await sendVerificationEmail(email, verifyLink);

        return res.status(200).send({
            ok: true,
            message: "Signup successful. Please check your email to verify.",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).send({
            ok: false,
            message: "Internal Server Error",
        });
    }
};