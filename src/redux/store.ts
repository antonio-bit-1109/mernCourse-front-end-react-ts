import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./fetches/usersApi";
import { TokenApi } from "./fetches/tokenApi";
import tokenReducer from "./fetches/traditionalSlices/tokenReducer";

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
