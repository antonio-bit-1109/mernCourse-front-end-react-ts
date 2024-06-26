import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
import { RootState } from "../../store";
import { ICreateUserBody, IUser, Ireply } from "../../../interfaces/interfaces";
// import { SerializedError } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import Header from "../../../components/MAIN/Header";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

// builder.query/mutation< RISPOSTA DELL API IN CASO DI SUCCESSO  ,   PARAMETRO che si aspetta la query   >

export const UsersApi = createApi({
    reducerPath: "UserApi",
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
        getAllUsers: builder.query<IUser[], null>({
            query: () => "/Users",
        }),
        //POST
        createNewUser: builder.mutation<{ message: string }, ICreateUserBody>({
            query: (newUserData) => ({
                url: "/Users",
                method: "POST",
                body: newUserData,
            }),
        }),
        //PATCH
        editUser: builder.mutation<string, { id: string; username: string; roles: string[]; active: boolean }>({
            query: (dataEditUser) => ({
                url: "/Users",
                method: "PATCH",
                body: dataEditUser,
            }),
        }),
        //DELETE
        deleteUser: builder.mutation<Ireply, { id: string }>({
            query: (userId) => ({
                url: "/Users",
                method: "DELETE",
                body: userId,
            }),
        }),
        // POST
        getSingleUser: builder.mutation<IUser, { id: string }>({
            query: (userId) => ({
                url: "/Users/get-user",
                method: "POST",
                body: userId,
            }),
        }),
        //POST
        softDeleteUser: builder.mutation<Ireply, { id: string }>({
            query: (userId) => ({
                url: "/Users/user-soft-delete",
                method: "POST",
                body: userId,
            }),
        }),

        changeImageProfile: builder.mutation<{ message: string }, { userId: string; StringImage: FormData }>({
            query: ({ userId, StringImage }) => ({
                url: `Users/uploadUserImg/${userId}`,
                method: "PATCH",
                body: StringImage,
            }),
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useCreateNewUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
    useGetSingleUserMutation,
    useSoftDeleteUserMutation,
    useChangeImageProfileMutation,
} = UsersApi;
