import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
import { clearToken } from "../traditionalSlices/tokenReducer";
import { DataAutentication, Itoken } from "../../../interfaces/interfaces";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

// builder.query/mutation< RISPOSTA DELL API   ,   PARAMETRO INVIATO NEL BODY  >

// credentials serve per inviare i cookie nelle richieste
export const TokenApi = createApi({
    reducerPath: "TokenApi",
    baseQuery: fetchBaseQuery({ baseUrl: LocalHostPath, credentials: "include" }),
    endpoints: (builder) => ({
        //POST
        login: builder.mutation<Itoken, DataAutentication>({
            query: (UserData) => ({
                url: "/Auth",
                method: "POST",
                body: UserData,
            }),
        }),

        sendLogout: builder.mutation<{ message: string }, null>({
            query: () => ({
                url: "Auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    // const { data } =
                    await queryFulfilled;
                    dispatch(clearToken());
                    // console.log(data);
                    dispatch(TokenApi.util.resetApiState());
                } catch (err) {
                    console.error(err);
                }
            },
        }),

        refresh: builder.mutation({
            query: () => ({
                url: "Auth/refresh",
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = TokenApi;
