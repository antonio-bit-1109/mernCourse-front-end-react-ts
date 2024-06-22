// SCRIVO UN MIDDLEWARE LISTENER DI STATO CHE è IN ASCOLTO DELLA SCADENZA DEL TOKEN

import { ListenerEffectAPI, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TokenApi } from "../app/api/tokenApiSlice";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../store";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { UsersApi } from "../app/api/usersApiSlice";
import { updateToken } from "../app/traditionalSlices/tokenReducer";
import { NotesApi } from "../app/api/notesApiSlice";
import {
    setResponseToCreateNote,
    setResponseToEditSingleUser,
    setResponseToGetAllNotes,
    setResponseToGetAllUsers,
    setResponseToGetSingleNote,
} from "../app/traditionalSlices/listenerRefetchReducer";

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

// questo listener viene attivato ogni volta che , con una fetch, tento di comunicare con uno di questi endpoint, durante il periodo di pending.
listenerMiddleware.startListening({
    matcher: isAnyOf(
        UsersApi.endpoints.createNewUser.matchPending,
        UsersApi.endpoints.getSingleUser.matchPending,
        UsersApi.endpoints.softDeleteUser.matchPending,
        UsersApi.endpoints.editUser.matchPending,
        UsersApi.endpoints.getAllUsers.matchPending,
        UsersApi.endpoints.changeImageProfile.matchPending,
        NotesApi.endpoints.checkCompletedNote.matchPending,
        NotesApi.endpoints.createNewNote.matchPending,
        NotesApi.endpoints.deleteNote.matchPending,
        NotesApi.endpoints.editNote.matchPending,
        NotesApi.endpoints.getAllUserNotes.matchPending,
        NotesApi.endpoints.getSingleNote.matchPending
    ),
    // quando tento di comunicare con l'endpoint, durante la fase di pending, se il token è scaduto, questo viene refreshato, contattando lendpoint per il refresh, e dispatchato nuovamente su redux.
    effect: async (action: any, listenerApi: ListenerEffectAPI<any, any>) => {
        const state = listenerApi.getState() as RootState; // Tipo di stato
        const { accessToken } = state.token;

        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const response = await listenerApi.dispatch(TokenApi.endpoints.refresh.initiate({}));
                if (response.error) {
                    console.error(response.error.data.message);
                }
                const newAccessToken = await response.data.accessToken;

                if (newAccessToken) {
                    await listenerApi.dispatch(updateToken(newAccessToken));
                    // // se ricavo un nuovo token dalla fetch lo salvo di nuovo du redux e rifaccio la fetch che ha fallito a causa del token
                    console.log(action);

                    const state = listenerApi.getState() as RootState;
                    const refreshedToken = state.token.accessToken;

                    if (refreshedToken !== accessToken) {
                        const possibleEndpoints = {
                            createNewUser: UsersApi.endpoints.createNewUser,
                            getSingleUser: UsersApi.endpoints.getSingleUser,
                            softDeleteUser: UsersApi.endpoints.softDeleteUser,
                            editUser: UsersApi.endpoints.editUser,
                            getAllUsers: UsersApi.endpoints.getAllUsers,
                            changeImageProfile: UsersApi.endpoints.changeImageProfile,
                            checkCompletedNote: NotesApi.endpoints.checkCompletedNote,
                            createNewNote: NotesApi.endpoints.createNewNote,
                            deleteNote: NotesApi.endpoints.deleteNote,
                            editNote: NotesApi.endpoints.editNote,
                            getAllUserNotes: NotesApi.endpoints.getAllUserNotes,
                            getSingleNote: NotesApi.endpoints.getSingleNote,
                        };

                        const endpointName: string = action.meta.arg.endpointName;
                        console.log("endpointName", endpointName);
                        const originalArgs = action.meta.arg.originalArgs;
                        console.log("originalArgs", originalArgs);

                        const apiSliceName: string = action.type.split("/")[0];
                        console.log("apiSliceName", apiSliceName);

                        if (endpointName && apiSliceName) {
                            //controllo quale sia l'endpoint contattato e salvo la risposta della seconda fetch su redux. uso i dati presi dalla seconda fetch per portarmeli nei componenti dove serve.
                            let argomenti;
                            if (originalArgs) {
                                argomenti = originalArgs;
                            } else {
                                argomenti = null;
                            }

                            const request = await listenerApi.dispatch(
                                possibleEndpoints[endpointName].initiate(argomenti)
                            );

                            if (endpointName === "createNewNote") {
                                const response = await request.data.message;
                                console.log(response);
                                await listenerApi.dispatch(setResponseToCreateNote(response));
                                return;
                            }
                            if (endpointName === "getAllUserNotes") {
                                const response = await request.data;
                                console.log(response);
                                await listenerApi.dispatch(setResponseToGetAllNotes(response));
                                return;
                            }

                            if (endpointName === "getAllUsers") {
                                const response = await request.data;
                                console.log(response);
                                await listenerApi.dispatch(setResponseToGetAllUsers(response));
                                return;
                            }
                            if (endpointName === "editUser") {
                                const response = await request.data.message;
                                console.log(response);
                                await listenerApi.dispatch(setResponseToEditSingleUser(response));
                                return;
                            }
                            if (endpointName === "getSingleNote") {
                                const response = await request.data;
                                console.log(response);
                                await listenerApi.dispatch(setResponseToGetSingleNote(response));
                                return;
                            }
                        } else {
                            throw new Error("non hai definito per bene quale endpoint richiamare.");
                        }
                    }
                }
            } catch (err) {
                console.error("Errore nel refresh del token", err);
            }
        }
    },
});

export default listenerMiddleware;
