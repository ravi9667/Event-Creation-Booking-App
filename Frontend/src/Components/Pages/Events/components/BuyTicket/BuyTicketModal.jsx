import React, { useState } from "react";
import "./BuyTicketModal.scss";

const BuyTicketModal = ({ event, onClose, onSuccess }) => {
    const [qty, setQty] = useState(1);

    const handleBuy = () => {
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
                    <p>{event.date}</p>
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
                        onChange={(e) => setQty(Number(e.target.value))}
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
