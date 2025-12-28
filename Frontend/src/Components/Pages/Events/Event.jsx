import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import EventsPage from "./components/EventsPage/EventsPage";
import { fetchAllEvents, fetchMyEvents } from "../../Api/eventsApi";
import { fetchMyTickets } from "../../Api/ticketApi";
import "./Event.scss";

const Events = () => {
    const user = { role: "creator" };
    const [activeTab, setActiveTab] = useState("");
    const [favourites, setFavourites] = useState([]);
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [ticketPage, setTicketPage] = useState(1);
    const [ticketHasMore, setTicketHasMore] = useState(true);
    const [boughtEventIds, setBoughtEventIds] = useState([]);

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


    const loadAllEvents = async (pageNo = 1, reset = false) => {
        if (loading) return;

        try {
            setLoading(true);

            const res = await fetchAllEvents(pageNo);

            if (res.data.ok) {
                setEvents(prev =>
                    reset ? res.data.data : [...prev, ...res.data.data]
                );
                setHasMore(res.data.hasMore);
            }

        } catch (err) {
            console.error("Fetch All Events Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleBuySuccess = (eventId, qty) => {
        setEvents(prev =>
            prev.map(e =>
                e._id === eventId
                    ? { ...e, ticketsLeft: e.ticketsLeft - qty }
                    : e
            )
        );

        setBoughtEventIds(prev =>
            prev.includes(eventId) ? prev : [...prev, eventId]
        );
    };

    const loadMyTickets = async (pageNo = 1, reset = false) => {
        if (loading) return;
        try {
            setLoading(true);
            const res = await fetchMyTickets(pageNo);

            if (res.data.ok) {
                setEvents(prev =>
                    reset ? res.data.data : [...prev, ...res.data.data]
                );
                setTicketHasMore(res.data.hasMore);

                // ✅ boughtEventIds refresh-safe
                const ids = res.data.data.map(e => e._id);
                setBoughtEventIds(prev =>
                    reset ? ids : [...new Set([...prev, ...ids])]
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "my-tickets") {
            fetchMyTickets().then(res => {
                if (res.data.ok) {
                    setEvents(res.data.data);
                }
            });
        }
    }, [activeTab]);


    const loadMyEvents = async (pageNo = 1, reset = false) => {
        if (loading) return;
        try {
            setLoading(true);
            const res = await fetchMyEvents(pageNo);

            if (res.data.ok) {
                setEvents(prev =>
                    reset ? res.data.data : [...prev, ...res.data.data]
                );
                setHasMore(res.data.hasMore);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "all-events") {
            setPage(1);
            loadAllEvents(1, true);
        }

        if (activeTab === "my-events") {
            setPage(1);
            loadMyEvents(1, true);
        }

        if (activeTab === "my-tickets") {
            setTicketPage(1);
            loadMyTickets(1, true);
        }
    }, [activeTab]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
                !loading
            ) {
                if (activeTab === "all-events" && hasMore) {
                    const next = page + 1;
                    setPage(next);
                    loadAllEvents(next);
                }

                if (activeTab === "my-events" && hasMore) {
                    const next = page + 1;
                    setPage(next);
                    loadMyEvents(next);
                }

                if (activeTab === "my-tickets" && ticketHasMore) {
                    const next = ticketPage + 1;
                    setTicketPage(next);
                    loadMyTickets(next);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, ticketPage, hasMore, ticketHasMore, loading, activeTab]);

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
                events={events}
                loading={loading}
                onBuySuccess={handleBuySuccess}
                boughtEventIds={boughtEventIds}
            />
        </div>
    );
};

export default Events;
