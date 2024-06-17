import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/app/traditionalSlices/tokenReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoLoginUtente: React.FC<any> = ({ error, isLoading, token }) => {
    const dispatch: AppDispatch = useDispatch();
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
            dispatch(setCredentials(token.accessToken));
            setTimeout(() => {
                navigate("/singleUser");
            }, 2000);
        }
    }, [token, error, isLoading, navigate, dispatch]);

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
