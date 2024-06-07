// redux/slices/tokenSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TokenApi } from "../tokenApi";

interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: null,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        clearToken: (state) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(TokenApi.endpoints.Autentication.matchFulfilled, (state, { payload }) => {
            state.token = payload.token;
        });
    },
});

export const { clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
