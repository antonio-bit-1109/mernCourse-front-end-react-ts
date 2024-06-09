import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

export interface INote {
    _id: string;
    UserId: string;
    title: string;
    text: string;
    isCompleted: boolean;
}

export interface IMessageResponse {
    message: string;
}

export interface ICreateNoteBody {
    userId: string;
    bodyData: {
        title: string;
        text: string;
    };
}

export interface IEditNoteBody {
    userId: string;
    bodyData: {
        IdNote: string;
        title: string;
        text: string;
    };
}

export interface IDeleteNoteBody {
    IdNote: string;
    UserId: string;
}
// builder.query/mutation< RISPOSTA DELL API   ,   PARAMETRO che si aspetta la query  >

export const NotesApi = createApi({
    reducerPath: "NotesApi",
    baseQuery: fetchBaseQuery({ baseUrl: LocalHostPath }),
    endpoints: (builder) => ({
        //GET
        getAllUserNotes: builder.query<INote[], string>({
            query: (idUtente) => `/Notes/${idUtente}`,
        }),

        //POST
        createNewNote: builder.mutation<IMessageResponse, ICreateNoteBody>({
            query: ({ userId, bodyData }) => ({
                url: `/Notes/${userId}`,
                method: "POST",
                body: bodyData,
            }),
        }),

        // PATCH
        editNote: builder.mutation<IMessageResponse, IEditNoteBody>({
            query: ({ userId, bodyData }) => ({
                url: `/Notes/${userId}`,
                method: "POST",
                body: bodyData,
            }),
        }),

        // DELETE
        deleteNote: builder.mutation<IMessageResponse, IDeleteNoteBody>({
            query: ({ IdNote, UserId }) => ({
                url: `/Notes/${UserId}`,
                method: "DELETE",
                body: IdNote,
            }),
        }),

        //POST
        getSingleNote: builder.mutation<INote, IDeleteNoteBody>({
            query: ({ IdNote, UserId }) => ({
                url: `/Notes/${UserId}`,
                method: "POST",
                body: IdNote,
            }),
        }),

        //POST
        checkCompletedNote: builder.mutation<IMessageResponse, IDeleteNoteBody>({
            query: ({ IdNote, UserId }) => ({
                url: `/Notes/${UserId}`,
                method: "POST",
                body: IdNote,
            }),
        }),
    }),
});

export const {
    useGetAllUserNotesQuery,
    useCreateNewNoteMutation,
    useEditNoteMutation,
    useDeleteNoteMutation,
    useGetSingleNoteMutation,
    useCheckCompletedNoteMutation,
    //  useGetAllUsersQuery,
    //  useCreateNewUserMutation,
    //  useEditUserMutation,
    //  useDeleteUserMutation,
    //  useGetSingleUserMutation,
    //  useSoftDeleteUserMutation,
} = NotesApi;
