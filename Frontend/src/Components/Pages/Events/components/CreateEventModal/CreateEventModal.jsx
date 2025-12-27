import React, { useState } from "react";
import "./CreateEventModal.scss";

const CreateEventModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        eventName: "",
        venueLocation: "",
        date: "",        // 👈 separate
        time: "",        // 👈 separate
        ticketPrice: "",
        totalTicket: "",
        eventImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ MERGE DATE + TIME → ISO STRING (BACKEND FRIENDLY)
        const combinedDateTime = new Date(
            `${formData.date}T${formData.time}`
        ).toISOString();

        const payload = new FormData();
        payload.append("eventName", formData.eventName);
        payload.append("venueLocation", formData.venueLocation);
        payload.append("dateTime", combinedDateTime); // 👈 single field
        payload.append("ticketPrice", formData.ticketPrice);
        payload.append("totalTicket", formData.totalTicket);
        payload.append("eventImage", formData.eventImage);

        // 🔥 API CALL (example)
        // axios.post("/api/event/create", payload)

        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="create-event-modal">
                <div className="modal-header">
                    <h2>Create New Event</h2>
                    <span onClick={onClose}>✕</span>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            placeholder="Enter event name"
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
                            placeholder="Enter venue"
                            value={formData.venueLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* ✅ DATE + TIME (SEPARATE & USER FRIENDLY) */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Event Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Event Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
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
                                placeholder="500"
                                value={formData.ticketPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Total Tickets</label>
                            <input
                                type="number"
                                name="totalTicket"
                                placeholder="100"
                                value={formData.totalTicket}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Event Image</label>
                        <input
                            type="file"
                            name="eventImage"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;