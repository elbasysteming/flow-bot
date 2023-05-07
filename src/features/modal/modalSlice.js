import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    title: null,
    text: null,
    textButtom: null,
    dataId: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        closeModal: () => {
            return { ...initialState };
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
