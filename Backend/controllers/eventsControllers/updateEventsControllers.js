import mongoose from "mongoose";
import { events as EventsModel } from "../Models/events.js";

// Update Event Controller
export const updateEvent = async (req, res) => {
    try {
        // JWT verified via middleware
        const userId = req.user._id; // creator's id
        const eventId = req.params.id; // event to update

        // Find event
        const event = await EventsModel.findById(eventId);

        if (!event) {
            return res.status(404).send({ ok: false, message: "Event not found" });
        }

        // Only creator can update
        if (event.userId.toString() !== userId) {
            return res.status(403).send({ ok: false, message: "You are not authorized to edit this event" });
        }

        // Only upcoming events can be edited
        if (new Date(event.dateTime) <= new Date()) {
            return res.status(400).send({ ok: false, message: "Past events cannot be edited" });
        }

        // Update fields if provided in req.body
        const { eventName, venueLocation, dateTime, ticketPrice, totalTicket } = req.body;

        if (eventName) event.eventName = eventName;
        if (venueLocation) event.venueLocation = venueLocation;
        if (dateTime) event.dateTime = dateTime;
        if (ticketPrice) event.ticketPrice = ticketPrice;
        if (totalTicket) event.totalTicket = totalTicket;

        // Update event image if file uploaded
        if (req.file) {
            event.eventImage = req.file.path;
        }

        const updatedEvent = await event.save();

        return res.status(200).send({
            ok: true,
            message: "Event updated successfully",
            data: updatedEvent
        });

    } catch (err) {
        console.error("Update Event Error:", err);
        return res.status(500).send({ ok: false, message: "Failed to update event" });
    }
};
