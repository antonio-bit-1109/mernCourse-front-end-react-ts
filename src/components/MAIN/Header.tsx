import { Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.pathname);
    return (
        <>
            {" "}
            <Row>
                <Col>
                    <header className="d-flex justify-content-center my-3">
                        <h1>Benvenuto nel gestionale dell'azienda</h1>
                        <p
                            onClick={() => {
                                if (location.pathname === "/images") {
                                    navigate("/");
                                } else {
                                    navigate("images");
                                }
                            }}
                        >
                            change
                        </p>
                    </header>
                </Col>
            </Row>
        </>
    );
};

export default Header;
