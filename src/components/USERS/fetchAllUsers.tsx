import { Button, Card, Col } from "react-bootstrap";
import { useGetAllUsersQuery } from "../../redux/app/api/usersApiSlice";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setUserToEdit } from "../../redux/app/traditionalSlices/userReducer";

const AllUsersComp = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { userToEdit } = useSelector((store: RootState) => store.user);
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
        // Check if AllUserError is FetchBaseQueryError and has a non-null data property
        if (AllUserError.data) {
            // Safely access message, assuming it's a string. You might still need to check if message exists.
            const message = AllUserError.data.message;
            return <div>{message}</div>;
        }

        return null;
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
                        <Card key={`card-key-${user.__v + i}`}>
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
                                        if (userToEdit) {
                                            navigate("/editSingleUser");
                                        }
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
