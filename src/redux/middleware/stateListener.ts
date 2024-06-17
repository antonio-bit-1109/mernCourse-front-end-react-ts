// SCRIVO UN MIDDLEWARE LISTENER DI STATO CHE è IN ASCOLTO DELLA SCADENZA DEL TOKEN

import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TokenApi } from "../app/api/tokenApiSlice";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../store";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { UsersApi } from "../app/api/usersApiSlice";
import { updateToken } from "../app/traditionalSlices/tokenReducer";
import { NotesApi } from "../app/api/notesApiSlice";

const isTokenExpired = (token: string): boolean => {
    const decodedToken: IDecodedTokenStructure = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Timestamp corrente in secondi
    const timeExp = decodedToken.exp;
    if (timeExp) {
        return timeExp < currentTime;
    }
    return false;
};

const listenerMiddleware = createListenerMiddleware();

// Aggiungo un listener che viene attivato quando controllo se riesco a contattare gli endpoints dello user sul server.
listenerMiddleware.startListening({
    matcher: isAnyOf(
        UsersApi.endpoints.createNewUser.matchPending,
        UsersApi.endpoints.getSingleUser.matchPending,
        UsersApi.endpoints.softDeleteUser.matchPending,
        UsersApi.endpoints.editUser.matchPending,
        UsersApi.endpoints.getAllUsers.matchPending,
        NotesApi.endpoints.checkCompletedNote.matchPending,
        NotesApi.endpoints.createNewNote.matchPending,
        NotesApi.endpoints.deleteNote.matchPending,
        NotesApi.endpoints.editNote.matchPending,
        NotesApi.endpoints.getAllUserNotes.matchPending,
        NotesApi.endpoints.getSingleNote.matchPending
    ),
    effect: async (_, listenerApi) => {
        const state = listenerApi.getState() as RootState; // Tipo di stato
        const { accessToken } = state.token;
        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const response = await listenerApi.dispatch(TokenApi.endpoints.refresh.initiate({}));
                const newAccessToken = await response.data.accessToken;
                if (newAccessToken) {
                    listenerApi.dispatch(updateToken(newAccessToken));
                }
            } catch (err) {
                console.error("Errore nel refresh del token", err);
            }
        }
    },
});

export default listenerMiddleware;
