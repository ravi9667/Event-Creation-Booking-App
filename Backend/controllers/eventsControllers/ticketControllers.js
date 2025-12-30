import { Events } from "../../Models/events.js";
import { Ticket } from "../../Models/ticket.js";

export const buyTicket = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const { quantity } = req.body;
        const { eventId } = req.params;

        if (!quantity || quantity < 1) {
            return res.status(400).send({
                ok: false,
                message: "Invalid ticket quantity"
            });
        }

        // 1️⃣ Find event
        const event = await Events.findById(eventId);

        if (!event) {
            return res.status(404).send({
                ok: false,
                message: "Event not found"
            });
        }

        // 2️⃣ MAIN CHECK 🔥 (important)
        if (event.totalTicket < quantity) {
            return res.status(400).send({
                ok: false,
                message: `Only ${event.totalTicket} tickets available`
            });
        }

        // 3️⃣ Create ticket
        const ticket = await Ticket.create({
            userId: req.user._id,
            eventId: event._id,
            quantity,
            totalAmount: quantity * event.ticketPrice
        });

        // 4️⃣ Reduce tickets
        event.totalTicket -= quantity;
        await event.save();

        return res.status(201).send({
            ok: true,
            message: "Ticket purchased successfully",
            data: ticket,
            ticketsLeft: event.totalTicket
        });

    } catch (err) {
        console.error("Buy Ticket Error:", err);
        return res.status(500).send({
            ok: false,
            message: "Ticket purchase failed"
        });
    }
};