import { events as EventsModel } from "../../Models/events.js";

export const fetchAllEvents = async (req, res) => {
    try {
        // JWT is already verified via middleware, req.user exists

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const allEvents = await EventsModel.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await EventsModel.countDocuments();

        return res.status(200).send({
            ok: true,
            data: allEvents,
            total,
            hasMore: page * limit < total,
            page,
            limit
        });

    } catch (err) {
        console.error("Fetch All Events Error:", err);
        return res.status(500).send({ ok: false, message: "Failed to fetch events" });
    }
};