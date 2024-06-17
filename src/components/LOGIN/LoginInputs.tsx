import { Button, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/app/api/tokenApiSlice";
import EsitoLoginUtente from "./EsitoLoginUtente";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginInputs = () => {
    const navigate = useNavigate();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [autenticate, { data: token, isLoading, error }] = useLoginMutation();

    useEffect(() => {
        if (accessToken) {
            navigate("singleUser");
        }
    }, [navigate, accessToken]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await autenticate({ usernameBody: username, passwordBody: password });
    };

    return (
        <>
            {" "}
            <Col xs="12">
                <div className="text-center mt-5">
                    <h2>Login</h2>
                </div>
            </Col>
            <div className="d-flex justify-content-center mt-5">
                <Col xs="11" sm="8" md="5" lg="5">
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
            </div>
            {/* // esito del login */}
            <EsitoLoginUtente error={error} isLoading={isLoading} token={token} />
        </>
    );
};

export default LoginInputs;
