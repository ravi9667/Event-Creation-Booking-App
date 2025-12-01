import mongoose from "mongoose";
import { events as EventsModel } from "../../Models/events.js";

export const fetchMyEvents = async (req, res) => {
    try {
        // JWT verified via middleware
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const myEvents = await EventsModel.find({ userId })
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await EventsModel.countDocuments({ userId });

        return res.status(200).send({
            ok: true,
            data: myEvents,
            total,
            hasMore: page * limit < total,
            page,
            limit
        });

    } catch (err) {
        console.error("Fetch My Events Error:", err);
        return res.status(500).send({ ok: false, message: "Failed to fetch my events" });
    }
};