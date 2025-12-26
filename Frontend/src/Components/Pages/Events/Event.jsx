import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import EventsPage from "./components/EventsPage/EventsPage";
import "./Event.scss";

const Events = () => {
    // dummy logged in user
    const user = {
      role: "creator", // "viewer"
    };
  
    const [activeTab, setActiveTab] = useState("");
    const [favourites, setFavourites] = useState([]); // event IDs
  
    useEffect(() => {
      if (user.role === "creator") {
        setActiveTab("all-events");
      } else {
        setActiveTab("events");
      }
    }, [user.role]);
  
    const toggleFavourite = (eventId) => {
      setFavourites((prev) =>
        prev.includes(eventId)
          ? prev.filter((id) => id !== eventId)
          : [...prev, eventId]
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
