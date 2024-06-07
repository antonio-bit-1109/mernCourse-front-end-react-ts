import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../functions/LocalHostPath";
//funzione del toolkit per scrivere delle fetch parametriche. e ritornare in automatico le risposte.

export interface IUser {
    _id: string;
    username: string;
    roles: string[];
    active: boolean;
    __v: number;
}

export interface ICreateUserBody {
    username: string;
    password: string;
    roles: string[];
}

export interface Ireply {
    message: string;
}

export interface IiD {
    id: string;
}

// builder.query/mutation< RISPOSTA DELL API   ,   PARAMETRO INVIATO NEL BODY  >

export const UsersApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({ baseUrl: LocalHostPath }),
    endpoints: (builder) => ({
        //GET
        getAllUsers: builder.query<IUser[], void>({
            query: () => "/Users",
        }),
        //POST
        createNewUser: builder.mutation<IUser, ICreateUserBody>({
            query: (newUserData) => ({
                url: "/Users",
                method: "POST",
                body: newUserData,
            }),
        }),
        //PATCH
        editUser: builder.mutation<string, IUser>({
            query: (dataEditUser) => ({
                url: "/Users",
                method: "PATCH",
                body: dataEditUser,
            }),
        }),
        //DELETE
        deleteUser: builder.mutation<Ireply, IiD>({
            query: (userId) => ({
                url: "/Users",
                method: "DELETE",
                body: userId,
            }),
        }),
        // POST
        getSingleUser: builder.mutation<IUser, IiD>({
            query: (userId) => ({
                url: "/Users/get-user",
                method: "POST",
                body: userId,
            }),
        }),
        //POST
        softDeleteUser: builder.mutation<Ireply, IiD>({
            query: (userId) => ({
                url: "/Users/user-soft-delete",
                method: "POST",
                body: userId,
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
} = UsersApi;