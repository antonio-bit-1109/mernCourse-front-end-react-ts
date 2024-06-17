import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { persistor, store } from "./redux/store.ts";
// import { PersistGate } from "redux-persist/integration/react";

// import { PersistGate } from "redux-persist/integration/react";
// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        {/* <QueryClientProvider client={queryClient}> */}
        {/* </QueryClientProvider> */}
        <PersistGate persistor={persistor}>
            {" "}
            <App />
        </PersistGate>
    </Provider>
);
