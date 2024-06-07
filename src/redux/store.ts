import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./fetches/usersApi";

export const store = configureStore({
    reducer: {
        [UsersApi.reducerPath]: UsersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UsersApi.middleware),
    devTools: true,
});
