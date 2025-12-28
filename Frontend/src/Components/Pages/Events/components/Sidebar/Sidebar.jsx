import React, { useState, useEffect } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";
import "./Sidebar.scss";

const Sidebar = ({ role, activeTab, setActiveTab }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Events</h2>

            <div className="menu">
                {role === "creator" && (
                    <>
                        <div
                            className={`menu-item ${activeTab === "all-events" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("all-events")}
                        >
                            All Events
                        </div>

                        <div
                            className={`menu-item ${activeTab === "my-events" ? "active" : ""
                                }`}
                            onClick={() => setActiveTab("my-events")}
                        >
                            My Events
                        </div>
                    </>
                )}

                {role === "viewer" && (
                    <div
                        className={`menu-item ${activeTab === "events" ? "active" : ""
                            }`}
                        onClick={() => setActiveTab("events")}
                    >
                        Events
                    </div>
                )}

                <div
                    className={`menu-item ${activeTab === "my-tickets" ? "active" : ""
                        }`}
                    onClick={() => setActiveTab("my-tickets")}
                >
                    My Tickets
                </div>

                <div
                    className={`menu-item ${activeTab === "favourites" ? "active" : ""
                        }`}
                    onClick={() => setActiveTab("favourites")}
                >
                    Favourites
                </div>
                <button
                    className="logout menu-item"
                    onClick={() => setShowLogoutModal(true)}
                >
                    Log out
                </button>
                {showLogoutModal && (
                    <LogoutModal
                        onClose={() => setShowLogoutModal(false)}
                        onConfirm={handleLogout}
                    />
                )}
            </div>
        </aside>
    );
};

export default Sidebar;