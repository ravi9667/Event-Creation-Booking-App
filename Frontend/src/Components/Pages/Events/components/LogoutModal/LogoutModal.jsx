import React from "react";
import "./LogoutModal.scss";

const LogoutModal = ({ onClose, onConfirm }) => {
    return (
        <div className="modal-backdrop">
            <div className="logout-modal">
                <h3>Confirm Logout</h3>
                <p>
                    Are you sure you want to logout?
                </p>

                <div className="modal-actions">
                    <button className="secondary-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="danger-btn" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
