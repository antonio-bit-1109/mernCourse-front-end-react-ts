import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalHostPath } from "../../../functions/LocalHostPath";
import { RootState } from "../../store";
// import { useSelector } from "react-redux";
// import Header from "../../../components/MAIN/Header";
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

// builder.query/mutation< RISPOSTA DELL API   ,   PARAMETRO che si aspetta la query   >

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
        getAllUsers: builder.query<IUser[], void>({
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
        editUser: builder.mutation<string, IUser>({
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
