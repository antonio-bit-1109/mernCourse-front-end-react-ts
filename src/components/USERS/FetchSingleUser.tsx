import { Button, Card } from "react-bootstrap";
import { useGetSingleUserMutation } from "../../redux/app/api/usersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
const FetchSingleUser = () => {
    const navigate = useNavigate();
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
            </>
        );
    }

    return null;
};

export default FetchSingleUser;
