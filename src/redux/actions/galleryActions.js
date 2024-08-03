import customAxios from "../../utils/customAxios";
import {
    createSingleGalleryFail,
    createSingleGalleryRequest,
    createSingleGallerySuccess,
    deleteSingleGalleryFail,
    deleteSingleGalleryRequest,
    deleteSingleGallerySuccess,
    getGalleryPostsRequest,
    getGalleryPostsSuccess,
    getSingleGalleryFail,
    getSingleGalleryRequest,
    getSingleGallerySuccess,
    updateSingleGalleryFail,
    updateSingleGalleryRequest,
    updateSingleGallerySuccess,
} from "../reducers/galleryReducers";

// get all gallery posts
export const getAllGalleryPostBySearchAction =
    (category, newsType, page, onePageLimit, search) => async (dispatch) => {
        try {
            dispatch(getGalleryPostsRequest());
            const { data } = await customAxios.get(
                `/gallery/category/${category}?newsType=${newsType}&page=${page}&onePageLimit=${onePageLimit}&search=${search}`,
                {}
            );
            // console.log("search gallery action", data);
            dispatch(getGalleryPostsSuccess(data));
        } catch (error) {
            // console.log("something went wrong while searching gallery", error);
            dispatch(getGalleryPostsRequest(error?.response?.data?.message));
        }
    };
// create single gallery posts
export const createSingleGalleryPostAction = (formData) => async (dispatch) => {
    try {
        dispatch(createSingleGalleryRequest());
        const { data } = await customAxios.post(`/gallery/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("create single gallery action", data);
        dispatch(createSingleGallerySuccess(data.message));
    } catch (error) {
        // console.log("something went wrong while getting creating gallery", error);
        dispatch(createSingleGalleryFail(error?.response?.data?.message));
    }
};
// get single gallery posts
export const getSingleGalleryPostAction = (galleryId) => async (dispatch) => {
    try {
        dispatch(getSingleGalleryRequest());
        const { data } = await customAxios.get(`/gallery/single/${galleryId}`);
        // console.log("get single gallery action", data);
        dispatch(getSingleGallerySuccess(data.post));
    } catch (error) {
        // console.log("something went wrong while getting single gallery", error);
        dispatch(getSingleGalleryFail(error?.response?.data?.message));
    }
};
// update single gallery posts
export const updateSingleGalleryPostAction = (galleryId, formData) => async (dispatch) => {
    try {
        dispatch(updateSingleGalleryRequest());
        const { data } = await customAxios.put(`/gallery/single/${galleryId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("update gallery action", data);
        dispatch(updateSingleGallerySuccess(data.message));
    } catch (error) {
        // console.log("something went wrong while searching gallery", error);
        dispatch(updateSingleGalleryFail(error?.response?.data?.message));
    }
};
// delete single gallery posts
export const deleteSingleGalleryPostAction = (galleryId) => async (dispatch) => {
    try {
        dispatch(deleteSingleGalleryRequest());
        const { data } = await customAxios.delete(`/gallery/single/${galleryId}`);
        // console.log("update gallery action", data);
        dispatch(deleteSingleGallerySuccess(data.message));
    } catch (error) {
        // console.log("something went wrong while searching gallery", error);
        dispatch(deleteSingleGalleryFail(error?.response?.data?.message));
    }
};
