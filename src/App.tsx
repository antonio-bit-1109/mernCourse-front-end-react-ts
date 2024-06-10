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
import VIsualizzaNote from "./components/NOTES/VIsualizzaAllUserNotes";
import UserSettings from "./components/LOGIN/UserSettings";
import LoginInputs from "./components/LOGIN/LoginInputs";
import ImagesComp from "./components/MAIN/ImagesComp";
import AllUsersComp from "./components/USERS/fetchAllUsers";
import FetchSingleUser from "./components/USERS/FetchSingleUser";
import FetchSingleUserNote from "./components/NOTES/FetchSingleUserNote";
// import EditSIngleNote from "./components/NOTES/EditSingleNote";

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
                    <Route path="singleUser" element={<FetchSingleUser />} />
                    <Route path="singleNote/:idNote" element={<FetchSingleUserNote />} />
                    {/* <Route path="editSingleNote/:idNote" element={<EditSIngleNote />} /> */}
                </Route>

                <Route path="/allUsers" element={<AllUsersComp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
