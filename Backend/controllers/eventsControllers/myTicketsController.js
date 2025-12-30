import { Ticket } from "../../Models/ticket";

export const fetchMyTickets = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const tickets = await Ticket.find({ userId: req.user._id })
            .populate("eventId");

        const eventsMap = new Map();

        tickets.forEach(ticket => {
            const event = ticket.eventId;
            if (event) {
                eventsMap.set(event._id.toString(), {
                    ...event._doc,
                    boughtQuantity: ticket.quantity
                });
            }
        });

        return res.status(200).send({
            ok: true,
            data: Array.from(eventsMap.values())
        });

    } catch (err) {
        console.error("Fetch My Tickets Error:", err);
        res.status(500).send({ ok: false, message: "Failed to fetch my tickets" });
    }
};
