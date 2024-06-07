// import { useForm } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";

const LoginComponent = () => {
    //  const {
    //      register,
    //      handleSubmit,
    //      watch,
    //      formState: { errors },
    //  } = useForm();

    return (
        <Row className="justify-content-center">
            <Col xs="12">
                <div className="text-center">
                    <h2>Login</h2>
                </div>
            </Col>
            <Col xs="11" md="6" xl="5">
                <Form>
                    <Form.Group className="mb-3" controlId="nomeUtenteId">
                        <Form.Label>userName</Form.Label>
                        <Form.Control type="text" placeholder="inserisci nome utente" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="inserisci password" />
                    </Form.Group>
                </Form>
            </Col>{" "}
        </Row>
    );
};

export default LoginComponent;
