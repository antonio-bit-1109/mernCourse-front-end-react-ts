import { Col, Container, Row } from "react-bootstrap";
import FooterComp from "./FooterComp";
import { Outlet } from "react-router-dom";

const LoginComponent = () => {
    //  const {
    //      register,
    //      handleSubmit,
    //      watch,
    //      formState: { errors },
    //  } = useForm();

    return (
        <Container>
            <Row>
                <Col>
                    {" "}
                    <div className="my-5">
                        <div className="height">
                            <Outlet />
                        </div>

                        <FooterComp />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
