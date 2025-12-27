import React, { useState } from "react";
import "./EditEventModal.scss";

/* ---------- HELPERS ---------- */

// YYYY-MM-DD
const getDateValue = (dateStr) => {
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
};

// HH:mm (24hr – browser will show AM/PM nicely)
const getTimeValue = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const EditEventModal = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        eventName: event.title,
        venueLocation: event.venue,
        eventDate: getDateValue(event.date),
        eventTime: getTimeValue(event.date),
        ticketPrice: event.price,
        totalTicket: event.ticketsLeft,
        eventImage: null, // optional
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔥 Combine date + time → JS Date (backend expects Date)
        const combinedDateTime = new Date(
            `${formData.eventDate}T${formData.eventTime}`
        );

        const payload = new FormData();
        payload.append("eventName", formData.eventName);
        payload.append("venueLocation", formData.venueLocation);
        payload.append("dateTime", combinedDateTime.toISOString());
        payload.append("ticketPrice", formData.ticketPrice);
        payload.append("totalTicket", formData.totalTicket);

        if (formData.eventImage) {
            payload.append("eventImage", formData.eventImage);
        }

        // 🔥 API CALL (example)
        // axios.put(`/api/event/${event.id}`, payload)

        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="edit-event-modal">
                <div className="modal-header">
                    <h2>Edit Event</h2>
                    <span onClick={onClose}>✕</span>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Venue Location</label>
                        <input
                            type="text"
                            name="venueLocation"
                            value={formData.venueLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Event Date</label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Event Time</label>
                            <input
                                type="time"
                                name="eventTime"
                                value={formData.eventTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Ticket Price (₹)</label>
                            <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                min="0"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Total Tickets</label>
                            <input
                                type="number"
                                name="totalTicket"
                                value={formData.totalTicket}
                                min="1"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Update Image (optional)</label>
                        <input
                            type="file"
                            name="eventImage"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
