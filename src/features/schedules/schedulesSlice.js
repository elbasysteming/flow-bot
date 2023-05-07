import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const schedulesSlice = createSlice({
    name: "schedules",
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.items = [];
            if (state.items.length <= 0) {
                action.payload.forEach(element => {
                    state.items.push(element);
                });
            }
        },
        addItem: (state, action) => {
            console.log(action.payload);
            const { day } = action.payload;
            const data = { startTime: "05:00", endTime: "06:00" };
            const item = state.items.find(
                element => element.day === day
            );
            if (item) {
                item.intervals.push(data);
            }
        },
        updateItem: (state, action) => {
            const { day, index, name, value } = action.payload;
            const item = state.items.find(
                element => element.day === day
            );
            if (item) {
                item.intervals[index][name] = value;
                current(state);
            }
        },
        checkItem: (state, action) => {
            console.log(action.payload);
            const { day } = action.payload;
            const item = state.items.find(
                element => element.day === day
            );
            if (item) {
                item.intervals = [];
            }
        },
        deleteItem: (state, action) => {
            const { day, index } = action.payload;
            const item = state.items.find(
                element => element.day === day
            );
            if (item) {
                item.intervals.splice(index, 1);
            }
        },
    },
});

export const { addItems, addItem, updateItem, checkItem, deleteItem } =
    schedulesSlice.actions;

export default schedulesSlice.reducer;
