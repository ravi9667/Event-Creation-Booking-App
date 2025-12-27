import axios from "axios";

// axios instance create
const api = axios.create({
    baseURL: "http://localhost:6060/api", // abhi local backend
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // cookies / auth ke liye (safe)
});

// request interceptor (JWT attach karne ke liye)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor (common error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // token expire / invalid
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;