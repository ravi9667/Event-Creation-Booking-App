import api from "./Api";

export const buyTicketAPI = (eventId, quantity) => {
    return api.post(`/events/buy-ticket/${eventId}`, { quantity });
};

export const fetchMyTickets = (page = 1) => {
    return api.get(`/events/my-tickets?page=${page}`);
};