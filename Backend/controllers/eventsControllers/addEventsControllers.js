import mongoose from "mongoose";
import { Events } from "../../Models/events.js";

export const addEvent = async (req, res) => {
    try {
        // JWT verified via middleware
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const { eventName, venueLocation, dateTime, ticketPrice, totalTicket } = req.body;

        if (!eventName || !venueLocation || !dateTime || !ticketPrice || !totalTicket || !req.file) {
            return res.status(400).send({ ok: false, message: "All fields including event image are required" });
        }

        const newEvent = new Events({
            eventName,
            venueLocation,
            dateTime,
            ticketPrice,
            totalTicket,
            ticketsLeft: totalTicket,
            userId: new mongoose.Types.ObjectId(req.user._id),
            eventImage: req.file.path
        });

        const savedEvent = await newEvent.save();

        return res.status(201).send({
            ok: true,
            message: "Event created successfully",
            data: savedEvent
        });

    } catch (err) {
        console.error("Add Event Error:", err);
        return res.status(500).send({ ok: false, message: "Failed to create event" });
    }
};
