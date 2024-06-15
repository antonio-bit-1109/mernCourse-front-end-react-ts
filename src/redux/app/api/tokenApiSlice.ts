import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

// builder.query/mutation< RISPOSTA DELL API   ,   PARAMETRO INVIATO NEL BODY  >
export interface Itoken {
    accessToken: string;
}

export interface DataAutentication {
    usernameBody: string;
    passwordBody: string;
}

export const TokenApi = createApi({
    reducerPath: "TokenApi",
    baseQuery: fetchBaseQuery({ baseUrl: LocalHostPath }),
    endpoints: (builder) => ({
        //POST
        Autentication: builder.mutation<Itoken, DataAutentication>({
            query: (UserData) => ({
                url: "/Auth",
                method: "POST",
                body: UserData,
            }),
        }),
    }),
});

export const { useAutenticationMutation } = TokenApi;
