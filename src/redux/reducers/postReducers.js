import { createSlice } from "@reduxjs/toolkit";

const postReducers = createSlice({
    name: "postReducer",
    initialState: {
        loading: false,
        error: "",
        message: "",
        totalPosts: [],
        singlePost: {},
    },
    reducers: {
        // search posts
        // ==============================
        searchPostsRequest: (state) => {
            state.loading = true;
        },
        searchPostsSuccess: (state, action) => {
            state.loading = false;
            state.totalPosts = action.payload;
        },
        searchPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get single post
        // ==============================
        getSinglePostRequest: (state) => {
            state.loading = true;
        },
        getSinglePostSuccess: (state, action) => {
            state.loading = false;
            state.singlePost = action.payload;
        },
        getSinglePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create single post
        // ==============================
        createSinglePostRequest: (state) => {
            state.updatePostLoading = true;
        },
        createSinglePostSuccess: (state, action) => {
            state.createPostLoading = false;
            state.message = action.payload;
        },
        createSinglePostFail: (state, action) => {
            state.createPostLoading = false;
            state.error = action.payload;
        },
        // update single post
        // ==============================
        updateSinglePostRequest: (state) => {
            state.updatePostLoading = true;
        },
        updateSinglePostSuccess: (state, action) => {
            state.updatePostLoading = false;
            state.message = action.payload;
        },
        updateSinglePostFail: (state, action) => {
            state.updatePostLoading = false;
            state.error = action.payload;
        },
        // delete single post
        // ==============================
        deleteSinglePostRequest: (state) => {
            state.deletePostLoading = true;
        },
        deleteSinglePostSuccess: (state, action) => {
            state.deletePostLoading = false;
            state.message = action.payload;
        },
        deleteSinglePostFail: (state, action) => {
            state.deletePostLoading = false;
            state.error = action.payload;
        },
        // clear post message and error
        // ==============================
        clearPostMessage: (state) => {
            state.message = null;
        },
        clearPostError: (state) => {
            state.error = null;
        },
    },
});

export const {
    searchPostsRequest,
    searchPostsSuccess,
    searchPostsFail,
    getSinglePostRequest,
    getSinglePostSuccess,
    getSinglePostFail,
    updateSinglePostRequest,
    updateSinglePostSuccess,
    updateSinglePostFail,
    createSinglePostRequest,
    createSinglePostSuccess,
    createSinglePostFail,
    deleteSinglePostRequest,
    deleteSinglePostSuccess,
    deleteSinglePostFail,
    clearPostMessage,
    clearPostError,
} = postReducers.actions;

export default postReducers;
