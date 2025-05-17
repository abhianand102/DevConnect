import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice.js";
import requestReducer from "./requestSlice.js";

const appStore= configureStore({
    reducer: {
        User:userReducer,
        Feed:feedReducer,
        Connections:connectionReducer,
        Requests:requestReducer,
    },
});

export default appStore;