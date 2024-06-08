import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./app/api/usersApiSlice";
import { TokenApi } from "./app/api/tokenApiSlice";
import tokenReducer from "./app/traditionalSlices/tokenReducer";

export const store = configureStore({
    reducer: {
        [UsersApi.reducerPath]: UsersApi.reducer,
        [TokenApi.reducerPath]: TokenApi.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UsersApi.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
