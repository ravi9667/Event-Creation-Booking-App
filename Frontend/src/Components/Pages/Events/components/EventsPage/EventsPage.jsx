import React from "react";
import EventCard from "../EventCard/EventCard";

const EventsPage = ({ role, activeTab, favourites, toggleFavourite }) => {
    const events = [
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
    ];

    const filteredEvents =
        activeTab === "favourites"
            ? events.filter((e) => favourites.includes(e.id))
            : events;

    return (
        <div className="events-content">
            {/* HEADER */}
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

                {/* CREATE EVENT — ONLY CREATOR + MY EVENTS */}
                {role === "creator" && activeTab === "my-events" && (
                    <button className="create-btn">+ Create Event</button>
                )}
            </div>

            {/* EVENTS LIST */}
            <div className="events-list">
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        role={role}
                        activeTab={activeTab}
                        isFavourite={favourites.includes(event.id)}
                        onToggleFavourite={toggleFavourite}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
