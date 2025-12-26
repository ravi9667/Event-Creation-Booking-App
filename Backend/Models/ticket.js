// Models/ticket.js
import mongoose from "mongoose";

const TicketSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blogUser",
            required: true
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", TicketSchema);
