import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./app/api/usersApiSlice";
import { TokenApi } from "./app/api/tokenApiSlice";
import tokenReducer from "./app/traditionalSlices/tokenReducer";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { NotesApi } from "./app/api/notesApiSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token"], // Nome del reducer che desideri persistere
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
    reducer: {
        [UsersApi.reducerPath]: UsersApi.reducer,
        [TokenApi.reducerPath]: TokenApi.reducer,
        [NotesApi.reducerPath]: NotesApi.reducer,
        token: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(UsersApi.middleware)
            .concat(TokenApi.middleware)
            .concat(NotesApi.middleware),
    devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

// export const store = configureStore({
//     reducer: {
//         [UsersApi.reducerPath]: UsersApi.reducer,
//         [TokenApi.reducerPath]: TokenApi.reducer,
//         token: tokenReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UsersApi.middleware),
//     devTools: true,
// });
