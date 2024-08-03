import { createSlice } from "@reduxjs/toolkit";

const galleryReducers = createSlice({
    name: "galleryReducer",
    initialState: {
        loading: false,
        error: "",
        message: "",
        galleryPostsData: [],
    },
    reducers: {
        // get gallery posts
        // ==============================
        getGalleryPostsRequest: (state) => {
            state.loading = true;
        },
        getGalleryPostsSuccess: (state, action) => {
            state.loading = false;
            state.galleryPostsData = action.payload;
        },
        getGalleryPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get gallery post
        // ==============================
        getSingleGalleryRequest: (state) => {
            state.loading = true;
        },
        getSingleGallerySuccess: (state, action) => {
            state.loading = false;
            state.singleGalleryData = action.payload;
        },
        getSingleGalleryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create single gallery post
        // ==============================
        createSingleGalleryRequest: (state) => {
            state.loading = true;
        },
        createSingleGallerySuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        createSingleGalleryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update single gallery post
        // ==============================
        updateSingleGalleryRequest: (state) => {
            state.updateLoading = true;
        },
        updateSingleGallerySuccess: (state, action) => {
            state.updateLoading = false;
            state.message = action.payload;
        },
        updateSingleGalleryFail: (state, action) => {
            state.updateLoading = false;
            state.error = action.payload;
        },
        // delete single gallery post
        // ==============================
        deleteSingleGalleryRequest: (state) => {
            state.deleteLoading = true;
        },
        deleteSingleGallerySuccess: (state, action) => {
            state.deleteLoading = false;
            state.message = action.payload;
        },
        deleteSingleGalleryFail: (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload;
        },
        // clear gallery posts
        // ==============================
        clearGalleryMessage: (state) => {
            state.message = null;
        },
        clearGalleryError: (state) => {
            state.error = null;
        },
    },
});

export const {
    getGalleryPostsRequest,
    getGalleryPostsSuccess,
    getGalleryPostsFail,
    clearGalleryMessage,
    clearGalleryError,
    getSingleGalleryRequest,
    getSingleGallerySuccess,
    getSingleGalleryFail,
    updateSingleGalleryRequest,
    updateSingleGallerySuccess,
    updateSingleGalleryFail,
    deleteSingleGalleryRequest,
    deleteSingleGallerySuccess,
    deleteSingleGalleryFail,
    createSingleGalleryRequest,
    createSingleGallerySuccess,
    createSingleGalleryFail,
} = galleryReducers.actions;

export default galleryReducers;
