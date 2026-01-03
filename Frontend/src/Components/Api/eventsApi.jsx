import api from "./Api";

export const fetchAllEvents = (page = 1, limit = 12) => {
    return api.get(`/events/all-events?page=${page}&limit=${limit}`);
};

export const fetchMyEvents = (page = 1, limit = 12) => {
    return api.get(`events/my-events?page=${page}&limit=${limit}`);
};

export const createEvent = (formData) => {
    return api.post("/events/add-event", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateEvent = (eventId, formData) => {
    return api.put(`/events/update-event/${eventId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const fetchUserAPI = () => {
    return api.get("/user/me");
};
