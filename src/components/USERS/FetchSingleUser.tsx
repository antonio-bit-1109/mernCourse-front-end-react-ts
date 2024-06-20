import { Button, Card, Col } from "react-bootstrap";
import { useGetSingleUserMutation } from "../../redux/app/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { FcEditImage } from "react-icons/fc";
import { setLoggedUser } from "../../redux/app/traditionalSlices/userReducer";

const FetchSingleUser = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [fetchSingleUser, { data: user, error, isLoading }] = useGetSingleUserMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [decodedToken, setDecodedToken] = useState<IDecodedTokenStructure | null>(null);

    useEffect(() => {
        if (!accessToken) {
            navigate("/");
        }
    }, [navigate, accessToken]);

    useEffect(() => {
        if (decodedToken) {
            fetchSingleUser({ id: decodedToken.UserInfo.userId });
        }
    }, [decodedToken, fetchSingleUser]);

    useEffect(() => {
        if (accessToken) {
            const tokenDecripted = jwtDecode(accessToken) as IDecodedTokenStructure;
            console.log(tokenDecripted);
            setDecodedToken(tokenDecripted);
        }
    }, [accessToken]);

    // quando ritorna la risposta dalla fetch con lo user e questo è truty lo salvo in redux.
    useEffect(() => {
        if (user) {
            dispatch(setLoggedUser(user));
        }
    }, [user, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user data.</div>;
    }

    if (user) {
        return (
            <Col xs="10" md="6">
                {user && (
                    <>
                        <Card className="position-relative" key={user._id}>
                            <Card.Body>
                                <img
                                    src={`${LocalHostPath}/upload/${user.imageProfile}`}
                                    alt="immagine profilo"
                                    className=" img-thumbnail"
                                />
                                <Card.Title>{user.username}</Card.Title>
                                <Card.Text>{user.roles.join(", ")}</Card.Text>
                            </Card.Body>
                            <FcEditImage
                                onClick={() => {
                                    navigate("/changeImg");
                                }}
                                className="absolute-position-0 pointer"
                                size={40}
                            />
                        </Card>

                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/notes");
                                }}
                            >
                                visualizza note
                            </Button>
                            {decodedToken?.UserInfo.roles.includes("admin") && (
                                <Button
                                    onClick={() => {
                                        navigate("/AllUsers");
                                    }}
                                    className=" text-light m-0 mx-2"
                                >
                                    Get all users
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </Col>
        );
    }

    return null;
};

export default FetchSingleUser;
