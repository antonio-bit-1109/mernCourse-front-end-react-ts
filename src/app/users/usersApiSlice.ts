import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { rootState } from "../../interfaces/interfaces";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/Users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User", id }))];
                } else return [{ type: "User", id: "LIST" }];
            },
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

// ritorna l'oggetto risultante dalla query
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// create momoized selector
const selectUsersData = createSelector(selectUsersResult, (usersResult) => usersResult.data);

// creo una serie di selettori per i dati che mi interessa prendere e li rinomino
export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: rootState) => selectUsersData(state) ?? initialState);
