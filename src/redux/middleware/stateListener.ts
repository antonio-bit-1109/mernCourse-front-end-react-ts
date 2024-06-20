// SCRIVO UN MIDDLEWARE LISTENER DI STATO CHE è IN ASCOLTO DELLA SCADENZA DEL TOKEN

import { ListenerEffectAPI, ThunkDispatch, UnknownAction, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { TokenApi } from "../app/api/tokenApiSlice";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../store";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { UsersApi } from "../app/api/usersApiSlice";
import { updateToken } from "../app/traditionalSlices/tokenReducer";
import { NotesApi } from "../app/api/notesApiSlice";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

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

//tipizzo il parametro "action", utilizzato per risalire all'ultimo endpoint contattato, con tanto di informazioni utilizzate er contattare l'endpoint ( quindi i vari idUser, IdNote ecc ecc..)
// export interface ReduxPayloadActionStructure {
//     meta: {
//         RTK_autoBatch: boolean;
//         arg: {
//             endpointName: string;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             fixedCacheKey: any;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             originalArgs: any;
//         };
//         track: boolean | undefined;
//         type: string;
//         requestId: string;
//         requestStatus: string;
//         startedTimeStamp: number;
//     };
//     payload: any;
//     type: string;
// }

// questo listener viene attivato ogni volta che , con una fetch, tento di comunicare con uno di questi endpoint.
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
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState; // Tipo di stato
        const { accessToken } = state.token;

        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const response = await listenerApi.dispatch(TokenApi.endpoints.refresh.initiate({}));
                const newAccessToken = await response.data.accessToken;

                if (newAccessToken) {
                    listenerApi.dispatch(updateToken(newAccessToken));
                    // // se ricavo un nuovo token dalla fetch lo salvo di nuovo du redux e rifaccio la fetch che ha fallito a causa del token
                    // console.log(action);

                    // // const PossibleApi = {
                    // //     usersapi: UsersApi,
                    // //     notesapi: NotesApi,
                    // // };

                    // const possibleEndpoints = {
                    //     createNewUser: UsersApi.endpoints.createNewUser,
                    //     getSingleUser: UsersApi.endpoints.getSingleUser,
                    //     softDeleteUser: UsersApi.endpoints.softDeleteUser,
                    //     editUser: UsersApi.endpoints.editUser,
                    //     getAllUsers: UsersApi.endpoints.getAllUsers,
                    //     changeImageProfile: UsersApi.endpoints.changeImageProfile,
                    //     checkCompletedNote: NotesApi.endpoints.checkCompletedNote,
                    //     createNewNote: NotesApi.endpoints.createNewNote,
                    //     deleteNote: NotesApi.endpoints.deleteNote,
                    //     editNote: NotesApi.endpoints.editNote,
                    //     getAllUserNotes: NotesApi.endpoints.getAllUserNotes,
                    //     getSingleNote: NotesApi.endpoints.getSingleNote,
                    // };

                    // const endpointName = action.meta.arg.endpointName;
                    // const originalArgs = action.meta.arg.originalArgs;
                    // // const apiSliceName = action.type.split("/")[0].toLowerCase();

                    // if (possibleEndpoints[endpointName]) {
                    //     await listenerApi.dispatch(possibleEndpoints[endpointName].initiate(originalArgs));
                    // } else {
                    //     console.error(`Endpoint ${endpointName} non trovato.`);
                    // }
                }
            } catch (err) {
                console.error("Errore nel refresh del token", err);
            }
        }
    },
});

// async function doTheFetchAgain(
//     listenerApi: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>,
//     possibleEndpoints: any,
//     endpointName: string,
//     args: any
// ) {
//     await listenerApi.dispatch(possibleEndpoints[endpointName].initiate(args));
// }

// async function doTheFetchAgain(apiSlice: any, endpointName: string, args: any, listenerApi: any) {
//     const endpoint = apiSlice.endpoints[endpointName];
//     if (endpoint) {
//         await listenerApi.dispatch(endpoint.initiate(args));
//     } else {
//         console.error(`Endpoint ${endpointName} non trovato nello slice`);
//     }
// }

export default listenerMiddleware;
