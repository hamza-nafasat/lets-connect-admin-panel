import customAxios from "../../utils/customAxios";
import {
    getSingleMemberFail,
    getSingleMemberRequest,
    getSingleMemberSuccess,
    getSingleUserFail,
    getSingleUserRequest,
    getSingleUserSuccess,
    membersStatsFail,
    membersStatsRequest,
    membersStatsSuccess,
    searchMembersFail,
    searchMembersRequest,
    searchMembersSuccess,
    searchUserFail,
    searchUserRequest,
    searchUserSuccess,
    usersStatsFail,
    usersStatsRequest,
    usersStatsSuccess,
} from "../reducers/statsReducers";

// ===================================================================================
// users stats
// ===============
export const usersStatsAction = () => async (dispatch) => {
    try {
        dispatch(usersStatsRequest());
        const { data } = await customAxios.get(`/admin/users/stats`);
        // console.log("users stats action", data);
        dispatch(usersStatsSuccess(data.data));
    } catch (error) {
        dispatch(usersStatsFail(error?.response?.data?.message));
        // console.log("something went wrong while getting users stats", error);
    }
};
// ===============
// users Search
// ===============
export const searchUsersAction =
    (page = 1, onePageLimit = 6, name, gender) =>
    async (dispatch) => {
        try {
            dispatch(searchUserRequest());
            let url = `/admin/users/search?page=${String(page)}`;
            if (onePageLimit) url += `&onePageLimit=${String(onePageLimit)}`;
            if (name) url += `&name=${String(name)}`;
            if (gender) url += `&gender=${String(gender)}`;
            const { data } = await customAxios.get(url);
            // console.log("search user action", data);
            dispatch(searchUserSuccess(data));
        } catch (error) {
            dispatch(searchUserFail(error?.response?.data?.message));
            // console.log("something went wrong while searching user", error);
        }
    };
// ===============
// Get Single User
// ===============
export const getSingleUserAction = (userId) => async (dispatch) => {
    try {
        dispatch(getSingleUserRequest());
        const { data } = await customAxios.get(`/admin/user/stats/${String(userId)}`, {
            withCredentials: true,
        });
        console.log("search Single user action", data.user);
        dispatch(getSingleUserSuccess(data.user));
    } catch (error) {
        dispatch(getSingleUserFail(error?.response?.data?.message));
        // console.log("something went wrong while searching user", error);
    }
};

// ===================================================================================
// members stats
// ===============
export const membersStatsAction = () => async (dispatch) => {
    try {
        dispatch(membersStatsRequest());
        const { data } = await customAxios.get(`/admin/members/stats`);
        // console.log("members stats action", data.data);
        dispatch(membersStatsSuccess(data.data));
    } catch (error) {
        dispatch(membersStatsFail(error?.response?.data?.message));
        // console.log("something went wrong while getting members stats", error);
    }
};
// ===============
// members Search
// ===============
export const searchMembersAction =
    (page, onePageLimit, name, gender = "", martialStatus = "", socialLink = "", city = "") =>
    async (dispatch) => {
        try {
            dispatch(searchMembersRequest());
            let url = `/admin/members/search?page=${String(page)}`;
            if (onePageLimit) url += `&onePageLimit=${String(onePageLimit)}`;
            if (name) url += `&name=${String(name)}`;
            if (socialLink) url += `&socialLink=${String(socialLink)}`;
            if (martialStatus) url += `&martialStatus=${String(martialStatus)}`;
            if (gender) url += `&gender=${String(gender)}`;
            if (city) url += `&city=${String(city)}`;
            const { data } = await customAxios.get(url, {
                withCredentials: true,
            });
            // console.log("search member action", data);
            dispatch(searchMembersSuccess(data));
        } catch (error) {
            dispatch(searchMembersFail(error?.response?.data?.message));
            // console.log("something went wrong while searching member", error);
        }
    };
// ===============
// Get Single Member
// ===============
export const getSingleMemberAction = (userId) => async (dispatch) => {
    try {
        dispatch(getSingleMemberRequest());
        const { data } = await customAxios.get(`/admin/member/stats/${String(userId)}`, {
            withCredentials: true,
        });
        // console.log("search Single member action", data.member);
        dispatch(getSingleMemberSuccess(data.member));
    } catch (error) {
        dispatch(getSingleMemberFail(error?.response?.data?.message));
        // console.log("something went wrong while searching user", error);
    }
};
