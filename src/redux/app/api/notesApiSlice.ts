import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
import { RootState } from "../../store";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

export interface INote {
    _id: string;
    UserId: string;
    title: string;
    text: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    ticket: number;
    __v: number;
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

export interface IbodyData {
    userId: string;
    bodyData: {
        titleBody: string;
        textBody: string;
        IdNote: string;
    };
}
// builder.query/mutation< RISPOSTA DELL API all EVENTO FULLFILLED   ,   PARAMETRO che si aspetta la query/mutation  >

export const NotesApi = createApi({
    reducerPath: "NotesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: LocalHostPath,
        prepareHeaders: (Headers, { getState }) => {
            const token = (getState() as RootState).token.accessToken;
            if (token) {
                Headers.set("Authorization", `Bearer ${token}`);
            }
            return Headers;
        },
    }),
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
        editNote: builder.mutation<IMessageResponse, IbodyData>({
            query: ({ userId, bodyData }) => ({
                url: `/Notes/${userId}`,
                method: "PATCH",
                body: bodyData,
            }),
        }),

        // DELETE
        deleteNote: builder.mutation<IMessageResponse, { IdNote: string; UserId: string }>({
            query: ({ IdNote, UserId }) => ({
                url: `/Notes/${UserId}`,
                method: "DELETE",
                body: { IdNote },
            }),
        }),

        //POST
        getSingleNote: builder.mutation<INote, { NoteId: string; UserId: string }>({
            query: ({ NoteId, UserId }) => ({
                url: `/Notes/get-note/${UserId}`,
                method: "POST",
                body: { NoteId },
            }),
        }),

        //POST
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        checkCompletedNote: builder.mutation<IMessageResponse, { UserId: string; NoteId: string | any }>({
            query: ({ NoteId, UserId }) => ({
                url: `/Notes/completeNote/${UserId}`,
                method: "POST",
                body: { NoteId },
            }),
        }),

        uncheckNoteCompleted: builder.mutation<{ message: string }, { UserId: string; NoteId: string }>({
            query: ({ NoteId, UserId }) => ({
                url: `/Notes/uncheckNote/${UserId}`,
                method: "POST",
                body: { NoteId },
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
    useUncheckNoteCompletedMutation,
} = NotesApi;
