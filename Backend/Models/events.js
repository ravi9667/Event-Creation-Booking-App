import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true
        },
        venueLocation: {
            type: String,
            required: true,
            trim: true
        },
        dateTime: {
            type: Date,
            required: true
        },
        ticketsLeft: {
            type: Number,
            required: true
        },
        ticketPrice: {
            type: Number,
            required: true,
            min: 0
        },
        totalTicket: {
            type: Number,
            required: true,
            min: 1
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogUser',
            required: true
        },
        eventImage: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Events = mongoose.model("Event", EventSchema);