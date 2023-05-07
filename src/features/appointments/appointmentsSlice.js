import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        addAppointment: (state, action) => {
            state.push(JSON.parse(action.payload));
        },
    },
});

export const { addAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
