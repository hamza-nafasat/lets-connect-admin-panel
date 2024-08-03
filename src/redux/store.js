import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userReducers";
import statsReducers from "./reducers/statsReducers";
import postReducers from "./reducers/postReducers";
import galleryReducers from "./reducers/galleryReducers";
import eventReducers from "./reducers/eventReducers";
import reportReducers from "./reducers/reportReducers";

export const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

const store = configureStore({
    reducer: {
        [userReducers.name]: userReducers.reducer,
        [statsReducers.name]: statsReducers.reducer,
        [postReducers.name]: postReducers.reducer,
        [galleryReducers.name]: galleryReducers.reducer,
        [eventReducers.name]: eventReducers.reducer,
        [reportReducers.name]: reportReducers.reducer,
    },
});

export default store;
