import { Container } from "react-bootstrap";
import Header from "./Header";
import FooterComp from "./FooterComp";
import { Outlet } from "react-router-dom";

const MainPageComponent = () => {
    return (
        <div>
            <Container>
                <Header />
                <div className="height">
                    <Outlet />
                </div>
                {/* <MainPartComp /> */}
            </Container>
            <Container fluid>
                <FooterComp />
            </Container>
        </div>
    );
};

export default MainPageComponent;
