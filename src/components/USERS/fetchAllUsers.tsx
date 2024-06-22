import { Button, Card, Col } from "react-bootstrap";
import { useGetAllUsersQuery } from "../../redux/app/api/usersApiSlice";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setUserToEdit } from "../../redux/app/traditionalSlices/userReducer";
import { ICustomError, IUser } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";

const AllUsersComp = () => {
    const { responseToGetAllUsersRefetch_listener } = useSelector((store: RootState) => store.listenerRefetch);
    const [allUsers, setAllUsers] = useState<null | IUser[]>(null);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {
        isLoading,
        isSuccess,
        isError,
        error: AllUserError,
        data,
    } = useGetAllUsersQuery(null, {
        // refetchOnFocus: true,
        // refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });

    // se si mostra l'errore di ritorno dalla fetch dopo 2 secodni ritorna alla pagina precedente
    // useEffect(() => {
    //     let intervalId: ReturnType<typeof setTimeout>;

    //     if (AllUserError) {
    //         intervalId = setTimeout(() => {
    //             navigate(-1);
    //         }, 2000);
    //     }

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [AllUserError, navigate]);

    useEffect(() => {
        if (data) {
            setAllUsers(data);
            return;
        }

        if (responseToGetAllUsersRefetch_listener) {
            setAllUsers(responseToGetAllUsersRefetch_listener);
            return;
        }
    }, [responseToGetAllUsersRefetch_listener, data, dispatch]);

    if (isLoading) {
        return (
            <div className="h-100">
                {" "}
                <Spinner style={{ width: "350px", height: "350px" }} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (isError) {
        if (AllUserError) {
            const thisError = AllUserError as ICustomError;
            return <div>{thisError.data.message}</div>;
        }
    }

    if ((isSuccess && data) || (responseToGetAllUsersRefetch_listener && allUsers)) {
        return (
            <Col xs="10" md="6" lg="4">
                <Button
                    onClick={() => {
                        navigate("/singleUser");
                    }}
                >
                    Indietro
                </Button>
                <div>
                    {allUsers &&
                        allUsers.map((user, i) => (
                            <Card key={`card-key-${user._id + i}`}>
                                <Card.Body>
                                    <Card.Title>{user.username}</Card.Title>
                                    <Card.Text>
                                        {Array.isArray(user.roles) &&
                                            user.roles.map((role, i) => <span key={`role-key-${i}`}>{role}</span>)}
                                    </Card.Text>
                                    <Card.Text>{user.active && user.active ? "attivo" : "inattivo"}</Card.Text>
                                    <Button
                                        onClick={() => {
                                            dispatch(setUserToEdit(user));
                                            navigate("/editSingleUser");
                                        }}
                                        variant="primary"
                                    >
                                        Modifica
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            </Col>
        );
    }
};

export default AllUsersComp;
