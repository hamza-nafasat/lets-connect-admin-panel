import customAxios from "../../utils/customAxios";
import { getSingleEventFail } from "../reducers/eventReducers";
import {
    banReportedPostOwnerFail,
    banReportedPostOwnerRequest,
    banReportedPostOwnerSuccess,
    deleteReportFail,
    deleteReportRequest,
    deleteReportSuccess,
    getReportsFail,
    getReportsRequest,
    getReportsSuccess,
    getSingleReportRequest,
    getSingleReportSuccess,
    processReportFail,
    processReportRequest,
    processReportSuccess,
} from "../reducers/reportReducers";

// get all posts
export const getReportsAction = (page, onePageLimit, reason, status) => async (dispatch) => {
    try {
        dispatch(getReportsRequest());
        const { data } = await customAxios.get(
            `/reports/search?page=${page}&onePageLimit=${onePageLimit}&category=${reason}&status=${status}`
        );
        // console.log(data);
        dispatch(getReportsSuccess(data));
    } catch (error) {
        // console.log("something went wrong while getting reports", error);
        dispatch(
            getReportsFail(error?.response?.data?.message || "something went wrong while getting reports")
        );
    }
};

// getting single post

export const getSingleReportAction = (postId) => async (dispatch) => {
    try {
        dispatch(getSingleReportRequest());
        const { data } = await customAxios.get(`/reports/report/${postId}`);
        // console.log("search single post action", data);
        dispatch(getSingleReportSuccess(data.report));
    } catch (error) {
        dispatch(
            getSingleEventFail(error?.response?.data?.message || "something went wrong while this Report")
        );
        // console.log("something went wrong while getting single", error);
    }
};

// delete a single Report
export const deleteReportAction = (reportId) => async (dispatch) => {
    try {
        dispatch(deleteReportRequest());
        const { data } = await customAxios.delete(`/reports/report/${reportId}`);
        // console.log("delete single report action", data);
        dispatch(deleteReportSuccess(data.message));
    } catch (error) {
        dispatch(deleteReportFail(error?.response?.data?.message || "something went wrong while deleting"));
        // console.log("something went wrong while delete single report", error);
    }
};

// process a report
export const processReportAction = (reportId, status) => async (dispatch) => {
    try {
        dispatch(processReportRequest());
        const { data } = await customAxios.put(`/reports/process/${reportId}?status=${status}`);
        // console.log("process report action", data);
        dispatch(processReportSuccess(data.message));
    } catch (error) {
        dispatch(
            processReportFail(
                error?.response?.data?.message || "something went wrong while processing report"
            )
        );
        // console.log("something went wrong while process report", error);
    }
};

// banReportedPostOwner
// ====================
export const banReportedPostOwnerAction = (ownerId) => async (dispatch) => {
    try {
        dispatch(banReportedPostOwnerRequest());
        const { data } = await customAxios.put(`/users/user/ban/${ownerId}`);
        // console.log("ban reported Post Owner action", data);
        dispatch(banReportedPostOwnerSuccess(data.message));
    } catch (error) {
        dispatch(
            banReportedPostOwnerFail(
                error?.response?.data?.message || "something went wrong while ban a user"
            )
        );
        // console.log("something went wrong while ban a user", error);
    }
};
