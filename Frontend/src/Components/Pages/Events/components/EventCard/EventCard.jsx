import React from "react";
import like from "../../../../../assets/like.png"
import heart from "../../../../../assets/heart.png"
import demo1 from "../../../../../assets/demo1.png"
import "./EventCard.scss";

const EventCard = ({
    event,
    role,
    activeTab,
    isFavourite,
    onToggleFavourite,
}) => {
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
                <p className="event-price">₹ {event.price}</p>
            </div>

            <div className="event-actions">
                {event.ticketsLeft > 0 && (
                    <p className="tickets-left">
                        {event.ticketsLeft} tickets left
                    </p>
                )}

                <img
                    src={isFavourite ? heart : like}
                    className={`favourite-icon ${isFavourite ? "active" : ""
                        }`}
                    onClick={() => onToggleFavourite(event.id)}
                    alt="fav"
                />

                {role === "viewer" && event.ticketsLeft > 0 && (
                    <button className="primary-btn">Buy Ticket</button>
                )}

                {role === "creator" && activeTab === "my-events" && (
                    <button className="secondary-btn">Edit Event</button>
                )}
            </div>
        </div>
    );
};

export default EventCard;