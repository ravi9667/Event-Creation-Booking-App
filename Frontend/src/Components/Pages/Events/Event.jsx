import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import EventsPage from "./components/EventsPage/EventsPage";
import "./Event.scss";

const Events = () => {
    const user = { role: "creator" }; // "creator"

    const [activeTab, setActiveTab] = useState("");
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        setActiveTab(user.role === "creator" ? "all-events" : "events");
    }, [user.role]);

    const toggleFavourite = (id) => {
        setFavourites(prev =>
            prev.includes(id)
                ? prev.filter(e => e !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="events-layout">
            <Sidebar
                role={user.role}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <EventsPage
                role={user.role}
                activeTab={activeTab}
                favourites={favourites}
                toggleFavourite={toggleFavourite}
            />
        </div>
    );
};

export default Events;
