import customAxios from "../../utils/customAxios";
import {
    createSinglePostFail,
    createSinglePostRequest,
    createSinglePostSuccess,
    deleteSinglePostFail,
    deleteSinglePostRequest,
    deleteSinglePostSuccess,
    getSinglePostFail,
    getSinglePostRequest,
    getSinglePostSuccess,
    searchPostsFail,
    searchPostsRequest,
    searchPostsSuccess,
    updateSinglePostFail,
    updateSinglePostRequest,
    updateSinglePostSuccess,
} from "../reducers/postReducers";

// ====================
// search posts
// ====================
export const searchAllPostsAction = (category, page, onePageLimit) => async (dispatch) => {
    try {
        dispatch(searchPostsRequest());
        const { data } = await customAxios.get(
            `/posts/category/${category}?page=${page}&onePageLimit=${onePageLimit}`
        );
        // console.log("search posts action", data);
        dispatch(searchPostsSuccess(data));
    } catch (error) {
        dispatch(searchPostsFail(error?.response?.data?.message));
        // console.log("something went wrong while searching posts", error);
    }
};
// ===============
// get single post
// ===============

export const getSinglePostAction = (postId) => async (dispatch) => {
    try {
        dispatch(getSinglePostRequest());
        const { data } = await customAxios.get(`/posts/single/${postId}`);
        // console.log("search single post action", data);
        dispatch(getSinglePostSuccess(data.post));
    } catch (error) {
        dispatch(getSinglePostFail(error?.response?.data?.message));
        // console.log("something went wrong while getting single", error);
    }
};
// ===============
// create single post
// ===============

export const createSinglePostAction = (formData) => async (dispatch) => {
    try {
        dispatch(createSinglePostRequest());
        const { data } = await customAxios.post(`/posts/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("create single post action", data);
        dispatch(createSinglePostSuccess(data.message));
    } catch (error) {
        dispatch(createSinglePostFail(error?.response?.data?.message));
        // console.log("something went wrong while creating posty", error);
    }
};
// ===============
// update single post
// ===============

export const updateSinglePostAction = (postId, formData) => async (dispatch) => {
    try {
        dispatch(updateSinglePostRequest());
        const { data } = await customAxios.put(`/posts/single/${postId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("update single post action", data);
        dispatch(updateSinglePostSuccess(data.message));
    } catch (error) {
        dispatch(updateSinglePostFail(error?.response?.data?.message));
        // console.log("something went wrong while updating single", error);
    }
};
// ===============
// Delete single post
// ===============

export const deleteSinglePostAction = (postId) => async (dispatch) => {
    try {
        dispatch(deleteSinglePostRequest());
        const { data } = await customAxios.delete(`/posts/single/${postId}`);
        // console.log("delete single post action", data);
        dispatch(deleteSinglePostSuccess(data.message));
    } catch (error) {
        dispatch(deleteSinglePostFail(error?.response?.data?.message));
        // console.log("something went wrong while delete single post", error);
    }
};
