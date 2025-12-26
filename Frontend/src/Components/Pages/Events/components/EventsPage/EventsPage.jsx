import React, { useState } from "react";
import EventCard from "../EventCard/EventCard";
import BuyTicketModal from "../BuyTicket/BuyTicketModal";

const EventsPage = ({ role, activeTab, favourites, toggleFavourite }) => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Music Night",
            venue: "Delhi NCR",
            date: "25 Dec, 7:00 PM",
            price: 500,
            ticketsLeft: 12,
        },
        {
            id: 2,
            title: "Tech Conference",
            venue: "Bangalore",
            date: "30 Dec, 10:00 AM",
            price: 999,
            ticketsLeft: 0,
        },
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [boughtEvents, setBoughtEvents] = useState([]); // 👈 NEW

    const filteredEvents =
        activeTab === "favourites"
            ? events.filter(e => favourites.includes(e.id))
            : events;

    // 🔥 AFTER BUY
    const handleBuySuccess = (eventId, qty) => {
        // minus tickets
        setEvents(prev =>
            prev.map(e =>
                e.id === eventId
                    ? { ...e, ticketsLeft: e.ticketsLeft - qty }
                    : e
            )
        );

        // mark as bought
        if (!boughtEvents.includes(eventId)) {
            setBoughtEvents(prev => [...prev, eventId]);
        }
    };

    return (
        <div className="events-content">
            <div className="events-header">
                <h1>
                    {activeTab === "my-events"
                        ? "My Events"
                        : activeTab === "my-tickets"
                            ? "My Tickets"
                            : activeTab === "favourites"
                                ? "Favourites"
                                : "All Events"}
                </h1>
                {role === "creator" && (activeTab === "my-events" || activeTab === "all-events") && (
                    <button className="create-btn">+ Create Event</button>
                )}

            </div>

            <div className="events-list">
                {filteredEvents.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        role={role}
                        activeTab={activeTab}
                        isFavourite={favourites.includes(event.id)}
                        isBought={boughtEvents.includes(event.id)} // 👈 PASS
                        onToggleFavourite={toggleFavourite}
                        onBuy={() => setSelectedEvent(event)}
                    />
                ))}
            </div>

            {selectedEvent && (
                <BuyTicketModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onSuccess={(qty) => {
                        handleBuySuccess(selectedEvent.id, qty);
                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
};

export default EventsPage;
