import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const FooterComp = () => {
    const UserToken = useSelector((store: RootState) => store.token.token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [decodedToken, setDecodedToken] = useState<any>(null);
    const navigate = useNavigate();

    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    useEffect(() => {
        if (UserToken) {
            const tokenDecripted = jwtDecode(UserToken);
            console.log(tokenDecripted);
            setDecodedToken(tokenDecripted);
        }
    }, [UserToken]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderStatus = (token: any) => {
        if (token.isActive) {
            return "Attivo";
        }
        if (token.isActive !== false) {
            return "Inattivo";
        }

        return null;
    };

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
                            <p>
                                Current User: <span className="fw-bold fs-5">{decodedToken && decodedToken.name}</span>
                            </p>
                            <p>
                                Status:{" "}
                                <span className="fw-bold fs-5">{decodedToken && renderStatus(decodedToken)}</span>
                            </p>
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
