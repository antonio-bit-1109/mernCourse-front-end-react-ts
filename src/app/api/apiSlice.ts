import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { LocalHostPath } from "../../functions/LocalHostPath";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: LocalHostPath }),
    tagTypes: ["Note", "User"],
    endpoints: (builder) => ({}),
});
