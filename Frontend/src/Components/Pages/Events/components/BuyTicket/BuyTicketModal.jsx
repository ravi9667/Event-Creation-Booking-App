import React, { useState } from "react";
import "./BuyTicketModal.scss";

const BuyTicketModal = ({ event, onClose, onSuccess }) => {
    const [qty, setQty] = useState(1);

    // ✅ FORMAT DATE HERE (SAFE)
    const formattedDate = new Date(event.dateTime).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const handleBuy = () => {
        if (qty > event.ticketsLeft) {
            alert(`Only ${event.ticketsLeft} tickets left`);
            return;
        }

        onSuccess(qty);
        onClose();
    };


    return (
        <div className="modal-backdrop">
            <div className="buy-modal">
                <h2>Buy Tickets</h2>

                <div className="event-info">
                    <p className="title">{event.title}</p>
                    <p>{event.venue}</p>
                    <p>{formattedDate}</p> {/* ✅ FIX */}
                </div>

                <div className="price-row">
                    <span>Price</span>
                    <strong>₹ {event.price}</strong>
                </div>

                <div className="qty-row">
                    <label>Quantity</label>
                    <input
                        type="number"
                        min={1}
                        max={event.ticketsLeft}
                        value={qty}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value <= event.ticketsLeft) {
                                setQty(value);
                            }
                        }}
                    />
                </div>

                <p className="total">
                    Total: ₹ {qty * event.price}
                </p>

                <div className="modal-actions">
                    <button className="primary-btn" onClick={handleBuy}>
                        Confirm Purchase
                    </button>
                    <button className="secondary-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyTicketModal;