import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoLoginUtente: React.FC<any> = ({ error, isLoading, token }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigate("singleUser");
            }, 2000);
        } else {
            return;
        }
    }, [token, navigate]);

    return (
        <>
            {" "}
            <Col xs="12">
                <div className="d-flex justify-content-center mt-4">{error && <p>errore nell autenticazione.</p>}</div>
                <div className="d-flex justify-content-center mt-4">{isLoading && <p>caricamento...</p>}</div>
                <div className="d-flex justify-content-center mt-4">
                    {token && <p>login effettuato con successo.</p>}
                </div>
            </Col>
        </>
    );
};

export default EsitoLoginUtente;
