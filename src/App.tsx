import "bootstrap/dist/css/bootstrap.min.css";
import "./customClasses.scss";
import "./index.scss";
import "./App.scss";
// import HomePage from "./components/MAIN/HomePage";
import NavBarComp from "./components/MAIN/NavBarComp";
import MainPageComponent from "./components/MAIN/MainPageComponent";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/MAIN/LoginComponent";
import MainPartComp from "./components/MAIN/MainPartComp";
import VIsualizzaNote from "./components/MAIN/VIsualizzaNote";
import UserSettings from "./components/MAIN/UserSettings";

function App() {
    return (
        <BrowserRouter>
            <NavBarComp />
            <Routes>
                <Route path="/" element={<MainPageComponent />}>
                    <Route index element={<MainPartComp />} />
                    <Route path="login" element={<LoginComponent />} />
                    <Route path="notes" element={<VIsualizzaNote />} />
                    <Route path="UserSettings" element={<UserSettings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
