import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./app/api/usersApiSlice";
import { TokenApi } from "./app/api/tokenApiSlice";
import tokenReducer from "./app/traditionalSlices/tokenReducer";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { NotesApi } from "./app/api/notesApiSlice";
import listenerMiddleware from "./middleware/stateListener";
import persistReducer from "redux-persist/es/persistReducer";
// import expireReducer from "redux-persist-expire";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import userReducer from "./app/traditionalSlices/userReducer";
// import expireReducer from "redux-persist-expire";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["accessToken"], // Nome del reducer che desideri persistere
    // transform: [
    //     expireReducer("token", {
    //         expireSeconds: 60 * 60 * 24 * 7,
    //         expiredState: { accessToken: null },
    //         autoExpire: true,
    //     }),
    // ],
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
    reducer: {
        [UsersApi.reducerPath]: UsersApi.reducer,
        [TokenApi.reducerPath]: TokenApi.reducer,
        [NotesApi.reducerPath]: NotesApi.reducer,
        token: persistedReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .prepend(listenerMiddleware.middleware)
            .concat(UsersApi.middleware)
            .concat(TokenApi.middleware)
            .concat(NotesApi.middleware),
    devTools: true,
});

export const persistor = persistStore(store);

// Dopo la definizione dello store e di persistor

// Utilizza ReturnType sulla funzione getState dello store per ottenere il tipo di stato completo
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const store = configureStore({
//     reducer: {
//         [UsersApi.reducerPath]: UsersApi.reducer,
//         [TokenApi.reducerPath]: TokenApi.reducer,
//         token: tokenReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UsersApi.middleware),
//     devTools: true,
// });
