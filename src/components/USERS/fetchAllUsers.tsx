import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetAllUsersQuery } from "../../redux/app/api/usersApi";

const AllUsersComp = () => {
    const [isFetchSkipping, setIsFetchSkipping] = useState(true);
    const { data: users, error, isLoading, refetch } = useGetAllUsersQuery(undefined, { skip: isFetchSkipping });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching users data.</div>;
    }

    if (users) {
        return (
            <>
                {users.map((user) => (
                    <Card key={user._id}>
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>{user.roles.join(", ")}</Card.Text>
                            <Button
                                onClick={() => {
                                    refetch();
                                }}
                                variant="primary"
                            >
                                Go somewhere
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </>
        );
    }

    return (
        <Button
            onClick={() => {
                setIsFetchSkipping(!isFetchSkipping);
            }}
        >
            fetch
        </Button>
    ); // Return null if none of the conditions are met
};

export default AllUsersComp;
