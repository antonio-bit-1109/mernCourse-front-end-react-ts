import "bootstrap/dist/css/bootstrap.min.css";
import "./customClasses.scss";
import "./index.scss";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/MAIN/HomePage";
import NavBarComp from "./components/MAIN/NavBarComp";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBarComp />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
