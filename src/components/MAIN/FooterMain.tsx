import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FooterMain = () => {
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
                    </footer>{" "}
                    <p
                        onClick={() => {
                            navigate("/login");
                        }}
                        className=" text-dark m-0"
                    >
                        Login
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default FooterMain;
