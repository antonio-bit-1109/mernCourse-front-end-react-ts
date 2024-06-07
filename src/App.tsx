import "bootstrap/dist/css/bootstrap.min.css";
import "./customClasses.scss";
import "./index.scss";
import "./App.scss";
// import HomePage from "./components/MAIN/HomePage";
import NavBarComp from "./components/MAIN/NavBarComp";
import MainPageComponent from "./components/MAIN/MainPageComponent";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LOGIN/LoginComponent";
import MainPartComp from "./components/MAIN/MainPartComp";
import VIsualizzaNote from "./components/LOGIN/VIsualizzaNote";
import UserSettings from "./components/LOGIN/UserSettings";
import LoginInputs from "./components/LOGIN/LoginInputs";
import ImagesComp from "./components/MAIN/ImagesComp";
import AllUsersComp from "./components/USERS/fetchAllUsers";

function App() {
    return (
        <BrowserRouter>
            <NavBarComp />
            <Routes>
                <Route path="/" element={<MainPageComponent />}>
                    <Route index element={<MainPartComp />} />
                    <Route path="images" element={<ImagesComp />} />
                </Route>
                <Route path="/login" element={<LoginComponent />}>
                    <Route index element={<LoginInputs />} />
                    <Route path="notes" element={<VIsualizzaNote />} />
                    <Route path="UserSettings" element={<UserSettings />} />
                </Route>{" "}
                <Route path="/allUsers" element={<AllUsersComp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
