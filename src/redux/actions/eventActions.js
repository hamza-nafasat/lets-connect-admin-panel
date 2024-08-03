import customAxios from "../../utils/customAxios";
import {
    createEventFail,
    createEventRequest,
    createEventSuccess,
    deleteEventFail,
    deleteEventRequest,
    deleteEventSuccess,
    getEventsDataFail,
    getEventsDataRequest,
    getEventsDataSuccess,
    getEventsStatsFail,
    getEventsStatsRequest,
    getEventsStatsSuccess,
    getSingleEventFail,
    getSingleEventRequest,
    getSingleEventSuccess,
    updateEventFail,
    updateEventRequest,
    updateEventSuccess,
} from "../reducers/eventReducers";

// get all events by Search
export const getAllEventsBySearchAction = (page, onePageLimit, title) => async (dispatch) => {
    try {
        dispatch(getEventsDataRequest());
        const { data } = await customAxios.get(
            `/admin/events/search?page=${page}&onePageLimit=${onePageLimit}&title=${title}`
        );
        // console.log("search events action", data);
        dispatch(getEventsDataSuccess(data));
    } catch (error) {
        dispatch(getEventsDataFail(error?.response?.data?.message || "something went wrong while searching"));
        // console.log("something went wrong while searching events", error);
    }
};

// get all events stats
export const getEventsStatsAction = () => async (dispatch) => {
    try {
        dispatch(getEventsStatsRequest());
        const { data } = await customAxios.get(`/admin/events/stats`);
        // console.log("events stats action", data.data);
        dispatch(getEventsStatsSuccess(data.data));
    } catch (error) {
        dispatch(
            getEventsStatsFail(error?.response?.data?.message || "something went wrong while getting stats")
        );
        // console.log("something went wrong while getting events stats", error);
    }
};

// get single Event
export const getSingleEvent = (eventId) => async (dispatch) => {
    try {
        dispatch(getSingleEventRequest());
        const { data } = await customAxios.get(`/admin/event/reach/${eventId}`);
        // console.log("search single event action", data);
        dispatch(getSingleEventSuccess(data?.data));
    } catch (error) {
        dispatch(
            getSingleEventFail(error?.response?.data?.message || "something went wrong while this event")
        );
        // console.log("something went wrong while getting single", error);
    }
};

// delete single event
export const deleteEventAction = (eventId) => async (dispatch) => {
    try {
        dispatch(deleteEventRequest());
        const { data } = await customAxios.delete(`/events/single/${eventId}`);
        // console.log("delete single event action", data);
        dispatch(deleteEventSuccess(data.message));
    } catch (error) {
        dispatch(
            deleteEventFail(error?.response?.data?.message || "something went wrong while deleting event")
        );
        // console.log("something went wrong while delete single event", error);
    }
};

// update Event
export const updateEventAction = (eventId, formData) => async (dispatch) => {
    try {
        dispatch(updateEventRequest());
        const { data } = await customAxios.put(`/events/single/${eventId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("update event action", data);
        dispatch(updateEventSuccess(data.message));
    } catch (error) {
        dispatch(
            updateEventFail(error?.response?.data?.message || "something went wrong while updating event")
        );
        // console.log("something went wrong while updating event", error);
    }
};

// create event
export const createEventAction = (formData) => async (dispatch) => {
    try {
        dispatch(createEventRequest());
        const { data } = await customAxios.post(`/events/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("create event action", data);
        dispatch(createEventSuccess(data.message));
    } catch (error) {
        dispatch(
            createEventFail(error?.response?.data?.message || "something went wrong while creating event")
        );
        // console.log("something went wrong while creating event", error);
    }
};
