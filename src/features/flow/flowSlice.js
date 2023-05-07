import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: null,
        nodes: null,
        edges: null,
        status: null,
    },
];

export const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        updateFlow: (state, action) => {
            state[0] = { ...action.payload };
        },
        resetFlow: () => {
            return { ...initialState };
        },
    },
});

export const { updateFlow, resetFlow } = flowSlice.actions;

export default flowSlice.reducer;
