import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});


Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);

                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest); 
                }
            }
        }

        return Promise.reject(error);
    }
);


const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${baseURL}/refresh-token`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true
        });

        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
        }

        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
};

export default Axios;
