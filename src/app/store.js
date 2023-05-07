import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "../features/flow/flowSlice";

export const store = configureStore({
    reducer: {
        flow: flowReducer,
    },
});
