import { Col } from "react-bootstrap";
import { useGetSingleUserMutation } from "../../redux/app/api/usersApiSlice";
const FetchSingleUser = () => {
    const [fetchSingleUser, { data: users, error, isLoading, refetch }] = useGetSingleUserMutation();

    return (
        <>
            <Col>
                <div>pagina utente </div>
            </Col>
        </>
    );
};

export default FetchSingleUser;
