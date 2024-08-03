import { createSlice } from "@reduxjs/toolkit";

const reportReducers = createSlice({
    name: "reportReducer",
    initialState: {
        loading: false,
        error: "",
        message: "",
        reportsData: [],
        singleReport: {},
    },
    reducers: {
        // get all reports
        // =============================
        getReportsRequest: (state) => {
            state.loading = true;
        },
        getReportsSuccess: (state, action) => {
            state.loading = false;
            state.reportsData = action.payload;
        },
        getReportsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get single report
        // =============================
        getSingleReportRequest: (state) => {
            state.loading = true;
        },
        getSingleReportSuccess: (state, action) => {
            state.loading = false;
            state.singleReport = action.payload;
        },
        getSingleReportFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete a report
        // =============================
        deleteReportRequest: (state) => {
            state.deleteLoading = true;
        },
        deleteReportSuccess: (state, action) => {
            state.deleteLoading = false;
            state.message = action.payload;
        },
        deleteReportFail: (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload;
        },
        // process a report
        // =============================
        processReportRequest: (state) => {
            state.processLoading = true;
        },
        processReportSuccess: (state, action) => {
            state.processLoading = false;
            state.message = action.payload;
        },
        processReportFail: (state, action) => {
            state.processLoading = false;
            state.error = action.payload;
        },
        banReportedPostOwnerRequest: (state) => {
            state.banUserLoading = true;
        },
        banReportedPostOwnerSuccess: (state, action) => {
            state.banUserLoading = false;
            state.message = action.payload;
        },
        banReportedPostOwnerFail: (state, action) => {
            state.banUserLoading = false;
            state.error = action.payload;
        },
        // clear report message and error
        // =============================
        clearReportError: (state) => {
            state.error = "";
        },
        clearReportMessage: (state) => {
            state.message = "";
        },
    },
});

export const {
    getReportsRequest,
    getReportsSuccess,
    getReportsFail,
    getSingleReportRequest,
    getSingleReportSuccess,
    getSingleReportFail,
    deleteReportRequest,
    deleteReportSuccess,
    deleteReportFail,
    processReportRequest,
    processReportSuccess,
    processReportFail,
    banReportedPostOwnerRequest,
    banReportedPostOwnerSuccess,
    banReportedPostOwnerFail,
    clearReportError,
    clearReportMessage,
} = reportReducers.actions;

export default reportReducers;
