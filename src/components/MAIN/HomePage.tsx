import { Col, Container, Row } from "react-bootstrap";
import LoginComponent from "./LoginComponent";
const MainComp = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="text-center mt-4">
                            <h1>Welcome to Gestionale</h1>
                        </div>
                        <div>
                            {" "}
                            <LoginComponent />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainComp;
