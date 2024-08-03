import axios from "axios";
import { refreshAccessToken } from "../redux/actions/userAction"; // Import the refresh token action
import store from "../redux/store";

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    withCredentials: true,
});
customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const state = await store.getState();
        const { uniqueId } = await state.userReducer;
        const originalRequest = error.config;
        if (error.response?.data?.message === "Invalid or Expired Access Token" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await store.dispatch(refreshAccessToken(uniqueId));
                return customAxios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default customAxios;
