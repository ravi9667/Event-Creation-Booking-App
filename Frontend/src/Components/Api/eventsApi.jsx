import api from "./Api";

export const fetchAllEvents = (page = 1, limit = 12) => {
    return api.get(`/events/all-events?page=${page}&limit=${limit}`);
};

export const fetchMyEvents = (page = 1) => {
    return api.get(`events/my-events?page=${page}&limit=${limit}`);
};