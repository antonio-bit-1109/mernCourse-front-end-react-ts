import { Button, Card } from "react-bootstrap";
import { useGetSingleUserMutation } from "../../redux/app/api/usersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const FetchSingleUser = () => {
    const navigate = useNavigate();
    const { token } = useSelector((store: RootState) => store.token);
    const [fetchSingleUser, { data: user, error, isLoading }] = useGetSingleUserMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [decodedToken, setDecodedToken] = useState<any>(null);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [navigate, token]);

    useEffect(() => {
        if (decodedToken) {
            fetchSingleUser({ id: decodedToken.id });
        }
    }, [decodedToken, fetchSingleUser]);

    useEffect(() => {
        if (token) {
            const tokenDecripted = jwtDecode(token);
            console.log(tokenDecripted);
            setDecodedToken(tokenDecripted);
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user data.</div>;
    }

    if (user) {
        console.log(user);
        return (
            <>
                {user && (
                    <>
                        <Card key={user._id}>
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <Card.Text>{user.roles.join(", ")}</Card.Text>
                            </Card.Body>
                        </Card>

                        <div>
                            <Button
                                onClick={() => {
                                    navigate("/notes");
                                }}
                            >
                                visualizza note
                            </Button>
                        </div>
                    </>
                )}
            </>
        );
    }

    return null;
};

export default FetchSingleUser;
