import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { history } from "../../helpers/history";
import { fetchWrapper } from "../../services/api";
import { API_URL } from "../../const/api";
import { LOGIN, PRIVATE } from "../../const/paths";

const initialState = {
    user: window.localStorage.getItem("__user__")
        ? JSON.parse(window.localStorage.getItem("__user__"))
        : null,
    status: null,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }) => {
        const email = username;
        const passwordEnc = CryptoJS.AES.encrypt(
            password,
            process.env.REACT_APP_SECRET_KEY
        );
        const resp = await fetchWrapper.post(`${API_URL}session/login`, {
            email,
            password: passwordEnc.toString(),
        });
        return resp;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            localStorage.removeItem("__user__");
            history.navigate(LOGIN);
        },
    },

    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "fulfilled";
                localStorage.setItem(
                    "__user__",
                    JSON.stringify(action.payload.data)
                );
                state.user = action.payload.data;
                history.navigate(PRIVATE);
            })
            .addCase(login.rejected, state => {
                /*Validar error del hash de 60 o errorCode o 403*/
                state.status = "rejected";
                state.error = "Error de autenticación";
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
