import jwt from 'jsonwebtoken';
import { bookingUser } from "../../Models/bookingUsers";

export const fetchUser = async (req, res) => {
    try {
        // 1️⃣ Get token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                ok: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(403).send({
                ok: false,
                message: "Invalid or expired token"
            });
        }

        // 3️⃣ Fetch user from DB
        const user = await bookingUser.findById(decoded._id).select("name email role");

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "User not found"
            });
        }

        // 4️⃣ Send user
        return res.status(200).send({
            ok: true,
            data: user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            ok: false,
            message: "Failed to fetch user"
        });
    }
};