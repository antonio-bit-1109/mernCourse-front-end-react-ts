import { Container, Row } from "react-bootstrap";
import FooterComp from "./FooterComp";
import { Outlet } from "react-router-dom";

const LoginComponent = () => {
    return (
        <>
            <Container>
                <Row>
                    <div className="height">
                        <Outlet />
                    </div>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <FooterComp />
                </Row>
            </Container>
        </>
    );
};

export default LoginComponent;
