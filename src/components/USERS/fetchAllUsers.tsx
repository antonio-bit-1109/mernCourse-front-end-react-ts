import { Button, Card, Col } from "react-bootstrap";
import { useGetAllUsersQuery } from "../../redux/app/api/usersApiSlice";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setUserToEdit } from "../../redux/app/traditionalSlices/userReducer";
import { ICustomError } from "../../interfaces/interfaces";
import { useEffect } from "react";

const AllUsersComp = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {
        isLoading,
        isSuccess,
        isError,
        error: AllUserError,
        data,
    } = useGetAllUsersQuery(null, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });

    // se si mostra l'errore di ritorno dalla fetch dopo 2 secodni ritorna alla pagina precedente
    useEffect(() => {
        let intervalId: ReturnType<typeof setTimeout>;

        if (AllUserError) {
            intervalId = setTimeout(() => {
                navigate(-1);
            }, 2000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [AllUserError, navigate]);

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

    if (isSuccess) {
        return Array.isArray(data) ? (
            <Col xs="10" md="6" lg="4">
                <Button
                    onClick={() => {
                        navigate("/singleUser");
                    }}
                >
                    Indietro
                </Button>
                <div>
                    {data.map((user, i) => (
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
        ) : (
            <Col>
                <div>il ritorno della fetch non è un array</div>
            </Col>
        );
    }
};

export default AllUsersComp;
