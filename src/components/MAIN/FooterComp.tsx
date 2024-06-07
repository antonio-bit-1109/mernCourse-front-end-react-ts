import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FooterComp = () => {
    const navigate = useNavigate();

    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        <div className="sticky-bottom">
            {" "}
            <Row>
                <hr className="w-100" color="bg-black" />
                <Col xs="4">
                    <footer className="d-flex justify-content-start flex-column">
                        <div className="my-1">
                            {`${day}-${month}-${year}`} / {`${hours}:${minutes}`}
                        </div>

                        <div>
                            <p
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                vai al login
                            </p>
                        </div>

                        <div>
                            <p>Current User:</p>
                            <p>Status:</p>
                        </div>
                    </footer>
                </Col>
                <Col>
                    <div className="d-flex align-items-center h-100 justify-content-around">
                        {" "}
                        <div>
                            <p
                                onClick={() => {
                                    navigate("notes");
                                }}
                            >
                                Visualizza Note
                            </p>
                        </div>
                        <div>
                            <p
                                onClick={() => {
                                    navigate("UserSettings");
                                }}
                            >
                                Visualizza User Settings
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default FooterComp;
