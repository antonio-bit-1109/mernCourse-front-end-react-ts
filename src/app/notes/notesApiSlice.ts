import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { rootState } from "../../interfaces/interfaces";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getnotes: builder.query({
            query: () => "/Notes",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadednotes = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return notesAdapter.setAll(initialState, loadednotes);
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User", id }))];
                } else return [{ type: "User", id: "LIST" }];
            },
        }),
    }),
});

export const { useGetNotesQuery } = notesApiSlice;

// ritorna l'oggetto risultante dalla query
export const selectnotesResult = notesApiSlice.endpoints.getnotes.select();

// create momoized selector
const selectnotesData = createSelector(selectnotesResult, (notesResult) => notesResult.data);

// creo una serie di selettori per i dati che mi interessa prendere e li rinomino
export const {
    selectAll: selectAllnotes,
    selectById: selectnotesById,
    selectIds: selectUserIds,
} = notesAdapter.getSelectors((state: rootState) => selectnotesData(state) ?? initialState);
