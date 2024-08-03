import { createSlice } from "@reduxjs/toolkit";

const userReducers = createSlice({
    name: "userReducer",
    initialState: {
        loading: false,
        error: false,
        message: null,
        user: null,
        isAuthenticated: false,
        uniqueId: null,
    },
    reducers: {
        addUniqueId: (state, action) => {
            state.uniqueId = action.payload;
        },
        // login request
        // -------------
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Load User
        // ---------
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Logout User
        // ---------
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.user = null;
            state.message = action.payload.message;
            state.isAuthenticated = false;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // fail get access token
        // ----------------------
        refreshAccessTokenFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // clear message and error
        // ----------------------
        clearUserMessage: (state) => {
            state.message = null;
        },
        clearUserError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    clearUserMessage,
    clearUserError,
    refreshAccessTokenFail,
    addUniqueId,
} = userReducers.actions;

export default userReducers;
