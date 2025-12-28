import React, { useState } from "react";
import EventCard from "../EventCard/EventCard";
import BuyTicketModal from "../BuyTicket/BuyTicketModal";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import filter from "../../../../../assets/filter.png";
import search from "../../../../../assets/search.png";
import Loader from "../../../../Loader/Loader"
import "./EventsPage.scss";

const EventsPage = ({
    role,
    activeTab,
    favourites,
    toggleFavourite,
    events,
    loading,
    onBuySuccess,
    boughtEventIds
}) => {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [eventFilter, setEventFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");


    // ✅ DATE LOGIC (CORRECT & SAFE)
    const isUpcoming = (dateTime) =>
        new Date(dateTime).getTime() > Date.now();

    const isCompleted = (dateTime) =>
        new Date(dateTime).getTime() < Date.now();

    // ✅ USER FRIENDLY DATE FORMAT (WITH YEAR)
    const formatDate = (dateTime) =>
        new Date(dateTime).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    // ✅ FILTER + SEARCH LOGIC
    const filteredEvents = events.filter((event) => {
        if (activeTab === "favourites" && !favourites.includes(event.id)) {
            return false;
        }

        if (eventFilter === "upcoming" && !isUpcoming(event.dateTime)) {
            return false;
        }

        if (eventFilter === "completed" && !isCompleted(event.dateTime)) {
            return false;
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return (
                event.title.toLowerCase().includes(q) ||
                event.venue.toLowerCase().includes(q)
            );
        }

        return true;
    });

    return (
        <div className="events-content">
            {/* HEADER */}
            <div className="events-header">
                {/* LEFT */}
                <h1>
                    {activeTab === "my-events"
                        ? "My Events"
                        : activeTab === "my-tickets"
                            ? "My Tickets"
                            : activeTab === "favourites"
                                ? "Favourites"
                                : "All Events"}
                </h1>

                {/* RIGHT */}
                <div className="header-actions">
                    {role === "creator" &&
                        (activeTab === "my-events" ||
                            activeTab === "all-events") && (
                            <button
                                className="create-btn"
                                onClick={() => setShowCreateModal(true)}
                            >
                                + Create Event
                            </button>
                        )}

                    {showCreateModal && (
                        <CreateEventModal
                            onClose={() => setShowCreateModal(false)}
                        />
                    )}

                    {/* SEARCH + FILTER */}
                    <div className="search-filter-row">
                        <div className="search-box">
                            <input
                                type="search"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                            />
                            <img src={search} alt="search" />
                        </div>

                        <div className="filter-box">
                            <img src={filter} alt="filter" />
                            <select
                                value={eventFilter}
                                onChange={(e) =>
                                    setEventFilter(e.target.value)
                                }
                            >
                                <option value="all">All</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* EVENTS LIST */}
            <div className="events-list">

                {/* 🔄 Loader on top of cards */}
                {loading && (
                    <Loader />
                )}

                {/* 🎟️ Event Cards */}
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event._id}   // 👈 MongoDB id
                        event={{
                            ...event,
                            date: formatDate(event.dateTime),
                        }}
                        role={role}
                        activeTab={activeTab}
                        isFavourite={favourites.includes(event._id)}
                        isBought={boughtEventIds.includes(event._id)}
                        onToggleFavourite={toggleFavourite}
                        onBuy={() => setSelectedEvent(event)}
                    />
                ))}

            </div>

            {/* BUY MODAL */}
            {selectedEvent && (
                <BuyTicketModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onSuccess={(qty) => {
                        onBuySuccess(selectedEvent._id, qty);
                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
};

export default EventsPage;