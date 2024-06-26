// redux/slices/tokenSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// import { TokenApi } from "../api/tokenApiSlice";

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: null,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
        },

        clearToken: (state) => {
            state.accessToken = null;
        },

        updateToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },

    //-- matchfulfilled : ogni volta che la fetch autentication ritorna un valore di fulfilled quindi di riuscita, ,salva quel payload nello state specificato nella funzione
    //-- matchPending : ogni volta che la fetch autentication ritorna un valore attesa di risultato ,salva quel payload nello state specificato nella funzione
    //-- matchRejected : ogni volta che la fetch autentication ritorna un valore di rejected quindi di errore nella maggior parte dei casi ,salva quel payload nello state specificato nella funzione
    // extraReducers: (builder) => {
    //     builder.addMatcher(TokenApi.endpoints.Autentication.matchFulfilled, (state, { payload }) => {
    //         state.accessToken = payload.accessToken;
    //     });
    // },
});

export const { clearToken, setCredentials, updateToken } = tokenSlice.actions;

export default tokenSlice.reducer;

export const selectCurrentToken = (store: RootState) => store.token.accessToken;
