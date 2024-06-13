import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MdChangeCircle } from "react-icons/md";
import { useSoftDeleteUserMutation } from "../../redux/app/api/usersApiSlice";
import { clearToken } from "../../redux/app/traditionalSlices/tokenReducer";

const FooterComp = () => {
    const dispatch = useDispatch();
    const UserToken = useSelector((store: RootState) => store.token.token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [decodedToken, setDecodedToken] = useState<any>(null);
    const navigate = useNavigate();

    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const [softDeleteFetch, { isLoading, isSuccess, isError }] = useSoftDeleteUserMutation();

    useEffect(() => {
        if (UserToken) {
            const tokenDecripted = jwtDecode(UserToken);
            setDecodedToken(tokenDecripted);
        }
    }, [UserToken]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderStatus = (decodedToken: any) => {
        if (decodedToken.isActive) {
            return "Attivo";
        }
        if (!decodedToken.isActive) {
            return "Inattivo";
        }

        return null;
    };

    const deactivateUser = async () => {
        await softDeleteFetch({ id: decodedToken.id });
    };

    return (
        <div className="sticky-bottom">
            {" "}
            <hr className="w-100" color="bg-black" />
            <Col xs="4">
                <footer className="d-flex justify-content-start flex-column">
                    <div className="my-1">
                        {`${day}-${month}-${year}`} / {`${hours}:${minutes}`}
                    </div>

                    <div>
                        <p>
                            Current User:{" "}
                            <span className="fw-bold fs-5">{UserToken && decodedToken && decodedToken.name}</span>
                        </p>
                        <p>
                            Status:{" "}
                            <span className="fw-bold fs-5">
                                {UserToken && decodedToken && renderStatus(decodedToken)}
                            </span>
                            <span className="ms-2">
                                {UserToken && <MdChangeCircle onClick={deactivateUser} className="pointer" size={25} />}
                            </span>
                        </p>
                    </div>
                </footer>
            </Col>
            <Col>
                <div className="d-flex align-items-center h-100 justify-content-around mb-3">
                    {" "}
                    {UserToken && (
                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/createNewNote");
                                }}
                            >
                                Crea nuova nota
                            </Button>
                        </div>
                    )}
                    {UserToken && decodedToken && decodedToken.roles.includes("admin") && (
                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/createNewUser");
                                }}
                            >
                                Crea nuovo utente
                            </Button>
                        </div>
                    )}
                </div>
            </Col>
        </div>
    );
};

export default FooterComp;
