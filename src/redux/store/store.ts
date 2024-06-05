import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FirstReducer from "../reducers/firstReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
    transforms: [
        // expireReducer("token", {
        //     expireSeconds: 7 * 24 * 60 * 60, // 7 days
        //     expiredState: { token: null },
        //     autoExpire: true,
        // }),
    ],
};

const rootReducer = combineReducers({
    main: FirstReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
