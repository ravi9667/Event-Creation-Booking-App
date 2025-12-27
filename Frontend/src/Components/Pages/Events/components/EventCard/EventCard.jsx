import React, { useState } from "react";
import like from "../../../../../assets/like.png";
import heart from "../../../../../assets/heart.png";
import demo1 from "../../../../../assets/demo1.png";
import cart from "../../../../../assets/cart.png";
import checklist from "../../../../../assets/checklist.png";
import EditEventModal from "../EditEventModal/EditEventModal";
import "./EventCard.scss";

const EventCard = ({
    event,
    role,
    activeTab,
    isFavourite,
    isBought,          // 👈 NEW
    onToggleFavourite,
    onBuy,
}) => {

    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="event-card">
            <div className="event-image">
                <img src={demo1} alt={event.title} />
                {event.ticketsLeft === 0 && (
                    <span className="sold-tag">Sold Out</span>
                )}
            </div>

            <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event">{event.venue}</p>
                <p className="event">{event.date}</p>
                <div className="pricing">
                    <p className="event-price">₹ {event.price}</p>
                    {/* 🛒 / ✅ BUY STATUS ICON */}
                    {activeTab !== "my-tickets" && event.ticketsLeft > 0 && (
                        <button className="icon-btn" onClick={onBuy}>
                            <img
                                src={isBought ? checklist : cart}
                                className="buy-ticket-icon"
                                alt="buy-status"
                            />
                        </button>
                    )}
                </div>
            </div>

            <div className="event-actions">
                {event.ticketsLeft > 0 && (
                    <p className="tickets-left">
                        {event.ticketsLeft} tickets left
                    </p>
                )}

                {/* ❤️ Favourite */}
                <img
                    src={isFavourite ? heart : like}
                    className={`favourite-icon ${isFavourite ? "active" : ""}`}
                    onClick={() => onToggleFavourite(event.id)}
                    alt="fav"
                />

                {/* ✏️ EDIT */}
                {role === "creator" && activeTab === "my-events" && (
                    <button className="secondary-btn" onClick={() => setShowEditModal(true)}>Edit Event</button>
                )}
                {showEditModal && (
                    <EditEventModal
                        event={event}
                        onClose={() => setShowEditModal(false)}
                    />
                )}

            </div>
        </div>
    );
};

export default EventCard;
