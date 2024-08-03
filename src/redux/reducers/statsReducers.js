import { createSlice } from "@reduxjs/toolkit";

const statsReducers = createSlice({
    name: "statsReducer",
    initialState: {
        loading: false,
        error: false,
        message: null,
        usersStats: [],
        searchUsers: [],
        singleUser: {},
        membersStats: [],
        searchMembers: [],
    },
    reducers: {
        // -----------------------------------------------------------
        // users stats
        // -------------
        usersStatsRequest: (state) => {
            state.loading = true;
        },
        usersStatsSuccess: (state, action) => {
            state.loading = false;
            state.usersStats = action.payload;
        },
        usersStatsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // search users
        // -------------
        searchUserRequest: (state) => {
            state.searchUserLoading = true;
        },
        searchUserSuccess: (state, action) => {
            state.searchUserLoading = false;
            state.searchUsers = action.payload;
        },
        searchUserFail: (state, action) => {
            state.searchUserLoading = false;
            state.error = action.payload;
        },
        // Single users
        // -------------
        getSingleUserRequest: (state) => {
            state.loading = true;
        },
        getSingleUserSuccess: (state, action) => {
            state.loading = false;
            state.singleUser = action.payload;
        },
        getSingleUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // -----------------------------------------------------------
        // members stats
        // -------------
        membersStatsRequest: (state) => {
            state.loading = true;
        },
        membersStatsSuccess: (state, action) => {
            state.loading = false;
            state.membersStats = action.payload;
        },
        membersStatsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // search members
        // -------------
        searchMembersRequest: (state) => {
            state.memberSearchLoading = true;
        },
        searchMembersSuccess: (state, action) => {
            state.memberSearchLoading = false;
            state.searchMembers = action.payload;
        },
        searchMembersFail: (state, action) => {
            state.memberSearchLoading = false;
            state.error = action.payload;
        },
        // Single member
        // -------------
        getSingleMemberRequest: (state) => {
            state.loading = true;
        },
        getSingleMemberSuccess: (state, action) => {
            state.loading = false;
            state.singleMember = action.payload;
        },
        getSingleMemberFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // clear message and error
        // ----------------------
        clearStatsMessage: (state) => {
            state.message = null;
        },
        clearStatsError: (state) => {
            state.error = null;
        },
    },
});

export const {
    usersStatsRequest,
    usersStatsSuccess,
    usersStatsFail,
    searchUserRequest,
    searchUserSuccess,
    searchUserFail,
    getSingleUserRequest,
    getSingleUserSuccess,
    getSingleUserFail,
    membersStatsRequest,
    membersStatsSuccess,
    membersStatsFail,
    searchMembersRequest,
    searchMembersSuccess,
    searchMembersFail,
    getSingleMemberRequest,
    getSingleMemberSuccess,
    getSingleMemberFail,
    clearStatsMessage,
    clearStatsError,
} = statsReducers.actions;
export default statsReducers;
