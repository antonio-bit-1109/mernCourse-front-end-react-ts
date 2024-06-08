import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import { persistor, store } from "./redux/store.ts";
// import { PersistGate } from "redux-persist/integration/react";

// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>
);
