// redux/slices/tokenSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TokenApi } from "../api/tokenApiSlice";

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

    //-- matchfulfilled : ogni volta che la fetch autentication ritorna un valore di fulfilled quindi di riuscita, ,salva quel payload nello state specificato nella funzione
    //-- matchPending : ogni volta che la fetch autentication ritorna un valore attesa di risultato ,salva quel payload nello state specificato nella funzione
    //-- matchRejected : ogni volta che la fetch autentication ritorna un valore di rejected quindi di errore nella maggior parte dei casi ,salva quel payload nello state specificato nella funzione
    extraReducers: (builder) => {
        builder.addMatcher(TokenApi.endpoints.Autentication.matchFulfilled, (state, { payload }) => {
            state.token = payload.token;
        });
    },
});

export const { clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
