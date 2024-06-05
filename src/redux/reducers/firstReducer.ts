// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";
import { MainState_Interface } from "../../interfaces/interfaces";

// import {  } from "../../interfaces/MainStateInterface";

const initialState: MainState_Interface = {
    randomState: 0,
};

const stateReducerSlice = createSlice({
    name: "firstReducer",
    initialState,
    reducers: {
        setRandomState: (state, action) => {
            state.randomState = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setRandomState } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
