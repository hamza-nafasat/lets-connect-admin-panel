import { createSlice } from "@reduxjs/toolkit";

const eventReducers = createSlice({
    name: "eventReducer",
    initialState: {
        loading: false,
        error: "",
        message: "",
        eventStats: [],
        eventsData: [],
        singleEvent: {},
    },
    reducers: {
        // get all events Stats
        // =============================
        getEventsStatsRequest: (state) => {
            state.loading = true;
        },
        getEventsStatsSuccess: (state, action) => {
            state.loading = false;
            state.eventStats = action.payload;
        },
        getEventsStatsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get all events data
        // =============================
        getEventsDataRequest: (state) => {
            state.searchLoading = true;
        },
        getEventsDataSuccess: (state, action) => {
            state.searchLoading = false;
            state.eventsData = action.payload;
        },
        getEventsDataFail: (state, action) => {
            state.searchLoading = false;
            state.error = action.payload;
        },
        // get single event
        // =============================
        getSingleEventRequest: (state) => {
            state.loading = true;
        },
        getSingleEventSuccess: (state, action) => {
            state.loading = false;
            state.singleEvent = action.payload;
        },
        getSingleEventFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create a event
        // =============================
        createEventRequest: (state) => {
            state.loading = true;
        },
        createEventSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        createEventFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update event
        // =============================
        updateEventRequest: (state) => {
            state.updateLoading = true;
        },
        updateEventSuccess: (state, action) => {
            state.updateLoading = false;
            state.message = action.payload;
        },
        updateEventFail: (state, action) => {
            state.updateLoading = false;
            state.error = action.payload;
        },
        // delete event
        // =============================
        deleteEventRequest: (state) => {
            state.deleteLoading = true;
        },
        deleteEventSuccess: (state, action) => {
            state.deleteLoading = false;
            state.message = action.payload;
        },
        deleteEventFail: (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload;
        },
        // clear event message and error
        // =============================
        clearEventError: (state) => {
            state.error = "";
        },
        clearEventMessage: (state) => {
            state.message = "";
        },
    },
});

export const {
    getEventsStatsRequest,
    getEventsStatsSuccess,
    getEventsStatsFail,
    getEventsDataRequest,
    getEventsDataSuccess,
    getEventsDataFail,
    getSingleEventRequest,
    getSingleEventSuccess,
    getSingleEventFail,
    createEventRequest,
    createEventSuccess,
    createEventFail,
    updateEventRequest,
    updateEventSuccess,
    updateEventFail,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFail,
    clearEventError,
    clearEventMessage,
} = eventReducers.actions;

export default eventReducers;
