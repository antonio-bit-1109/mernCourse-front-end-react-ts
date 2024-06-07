import { Container } from "react-bootstrap";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import FooterMain from "./FooterMain";

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
                <FooterMain />
            </Container>
        </div>
    );
};

export default MainPageComponent;
