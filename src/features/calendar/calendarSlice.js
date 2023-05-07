import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    showForm: false,
    url: "",
    userId: "elbasysteming",
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        updateCalendarData: (state, action) => {
            Object.keys(action.payload).map(element => {
                state[element] = action.payload[element];
            });
        },
    },
});

export const { updateCalendarData } = calendarSlice.actions;

export default calendarSlice.reducer;
