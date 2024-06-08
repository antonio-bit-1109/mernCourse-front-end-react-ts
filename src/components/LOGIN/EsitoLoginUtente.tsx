import React from "react";
import { Col } from "react-bootstrap";

// type EsitoLoginUtenteProps = {
//     error: {
//         status: number;
//         data: { message: string };
//     };
//     isLoading: boolean;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoLoginUtente: React.FC<any> = ({ error, isLoading }) => {
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
