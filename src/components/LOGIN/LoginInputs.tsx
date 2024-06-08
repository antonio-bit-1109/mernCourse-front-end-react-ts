import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { useAutenticationMutation } from "../../redux/app/api/tokenApiSlice";
import EsitoLoginUtente from "./EsitoLoginUtente";

const LoginInputs = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [autenticate, { isLoading, error }] = useAutenticationMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await autenticate({ usernameBody: username, passwordBody: password });
        setUsername("");
        setPassword("");
    };

    return (
        <Row className="justify-content-center">
            <Col xs="12">
                <div className="text-center">
                    <h2>Login</h2>
                </div>
            </Col>
            <Col xs="11" md="6" xl="5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nomeUtenteId">
                        <Form.Label>userName</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            placeholder="inserisci nome utente"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="inserisci password"
                        />
                    </Form.Group>
                    <hr />
                    <Button type="submit"> Log In </Button>
                </Form>
            </Col>{" "}
            {/* // esito del login */}
            <EsitoLoginUtente error={error} isLoading={isLoading} />
        </Row>
    );
};

export default LoginInputs;
