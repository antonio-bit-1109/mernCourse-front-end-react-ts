import React from "react";
import { Col } from "react-bootstrap";

type EsitoLoginUtenteProps = {
    error: {
        status: number;
        data: { message: string };
    };
    isLoading: boolean;
};

const EsitoLoginUtente: React.FC<EsitoLoginUtenteProps> = ({ error, isLoading }) => {
    return (
        <>
            {" "}
            <Col>
                <div>{error && <p>errore nell autenticazione.</p>}</div>
                <div>{isLoading && <p>caricamento...</p>}</div>
            </Col>
        </>
    );
};

export default EsitoLoginUtente;
