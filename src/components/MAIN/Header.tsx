import { Col, Row } from "react-bootstrap";

const Header = () => {
    return (
        <>
            {" "}
            <Row>
                <Col>
                    <header className="d-flex justify-content-center my-3">
                        <h1>Benvenuto nel gestionale dell'azienda</h1>
                    </header>
                </Col>
            </Row>
        </>
    );
};

export default Header;
