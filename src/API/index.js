import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
    const storage = localStorage.getItem("token");

    if (storage) {
        config.headers.Authorization = `Bearer ${storage}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.clear()
            return (window.location = "/login");
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
