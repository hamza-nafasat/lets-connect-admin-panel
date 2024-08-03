import axios from "axios";
import customAxios from "../../utils/customAxios";
import {
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    logoutFail,
    logoutRequest,
    logoutSuccess,
} from "../reducers/userReducers";
import { serverUrl } from "../store";

// ======================
// login action
// ======================
export const loginAction = (phoneNumber, password, uniqueId) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post(
            `${serverUrl}/users/login`,
            { phoneNumber, password, isWeb: true, uniqueId },
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        // console.log("login user action", data);
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message || "Something went wrong while login"));
        // console.log("something went wrong while login", error);
    }
};
// ======================
// Load User action
// ======================
export const loadUserAction = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await customAxios.get(`/users/profile?isWeb=true`);
        // console.log("load user action", data);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error?.response?.data?.message || "Something went wrong while Loading User"));
        // console.log("something went wrong while Loading User", error);
    }
};
// ======================
// logout  action
// ======================
export const logoutAction = (uniqueId) => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const { data } = await customAxios.get(`/users/logout?uniqueId=${uniqueId}`);
        // console.log("logout user action", data);
        dispatch(logoutSuccess(data));
    } catch (error) {
        dispatch(logoutFail(error.response.data.message || "Something went wrong while logout"));
        // console.log("something went wrong while logout", error);
    }
};

// ===================
// get accessToken
// ===================

export const refreshAccessToken = (uniqueId) => async () => {
    try {
        await axios.get(`${serverUrl}/users/access-token?uniqueId=${uniqueId}`, {
            withCredentials: true,
        });
        // console.log("get access token", data);
    } catch (error) {
        if (window.location.pathname !== "/") {
            window.location.pathname = "/";
        }
        // console.log("get access token error", error);
    }
};
