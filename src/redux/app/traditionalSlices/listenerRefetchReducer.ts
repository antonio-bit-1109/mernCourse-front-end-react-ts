// redux/slices/tokenSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { INote, IUser } from "../../../interfaces/interfaces";
// import { RootState } from "../../store";

// import { TokenApi } from "../api/tokenApiSlice";

interface listenerRefetch {
    responseToCreateNoteRefetch_listener: null | string;
    responseToGetAllNotesRefetch_listener: null | INote[];
    responseToGetAllUsersRefetch_listener: null | IUser[];
    responseToEditSingleUserRefetch_listener: null | string;
    responseToGetSingleNoteRefetch_listener: null | INote;
}

const initialState: listenerRefetch = {
    responseToCreateNoteRefetch_listener: null,
    responseToGetAllNotesRefetch_listener: null,
    responseToGetAllUsersRefetch_listener: null,
    responseToEditSingleUserRefetch_listener: null,
    responseToGetSingleNoteRefetch_listener: null,
};

export const listenerRefetchSlice = createSlice({
    name: "listenerRefetchSlice",
    initialState,
    reducers: {
        setResponseToCreateNote: (state, action) => {
            state.responseToCreateNoteRefetch_listener = action.payload;
        },
        setResponseToGetAllNotes: (state, action) => {
            state.responseToGetAllNotesRefetch_listener = action.payload;
        },
        setResponseToGetAllUsers: (state, action) => {
            state.responseToGetAllUsersRefetch_listener = action.payload;
        },
        setResponseToEditSingleUser: (state, action) => {
            state.responseToEditSingleUserRefetch_listener = action.payload;
        },
        setResponseToGetSingleNote: (state, action) => {
            state.responseToGetSingleNoteRefetch_listener = action.payload;
        },
    },
});

export const {
    setResponseToCreateNote,
    setResponseToGetAllNotes,
    setResponseToGetAllUsers,
    setResponseToEditSingleUser,
    setResponseToGetSingleNote,
} = listenerRefetchSlice.actions;

export default listenerRefetchSlice.reducer;

// export const selectCurrentToken = (store: RootState) => store.token.accessToken;
