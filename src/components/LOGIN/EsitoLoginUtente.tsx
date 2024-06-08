import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoLoginUtente: React.FC<any> = ({ error, isLoading, token }) => {
    const navigate = useNavigate();

    const [loading, SetLoadig] = useState<string>("");
    const [errorState, SetErrorState] = useState<string>("");
    useEffect(() => {
        if (isLoading) {
            SetLoadig(isLoading);
            return;
        }

        if (error) {
            SetErrorState(error.data.message);
            return;
        }

        if (token) {
            setTimeout(() => {
                navigate("singleUser");
            }, 2000);
        }
    }, [token, error, isLoading, navigate]);

    return (
        <>
            {" "}
            <Col xs="12">
                <div className="d-flex justify-content-center mt-4">{error && <p>{errorState}</p>}</div>
                <div className="d-flex justify-content-center mt-4">{isLoading && <p>{loading}</p>}</div>
                <div className="d-flex justify-content-center mt-4">
                    {token && <p>login effettuato con successo.</p>}
                </div>
            </Col>
        </>
    );
};

export default EsitoLoginUtente;
