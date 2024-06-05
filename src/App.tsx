import "bootstrap/dist/css/bootstrap.min.css";
import "./customClasses.scss";
import "./index.scss";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComp from "./components/MAIN/MainComp";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainComp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
