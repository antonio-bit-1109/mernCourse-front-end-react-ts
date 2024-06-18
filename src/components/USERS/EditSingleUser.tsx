import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditSingleUser = () => {
    const navigate = useNavigate();
    const { userToEdit } = useSelector((store: RootState) => store.user);

    const [id, setId] = useState<null | string>(null);
    const [username, setUsername] = useState<null | string>(null);
    const [roles, setRoles] = useState<null | string[]>(null);
    const [isActive, setIsActive] = useState<null | boolean>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    useEffect(() => {
        if (userToEdit) {
            setId(userToEdit._id);
            setUsername(userToEdit.username);
            setRoles(userToEdit.roles);
            setIsActive(userToEdit.active);
        }
    }, [userToEdit]);

    return (
        <>
            <Col>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    indietro
                </Button>
            </Col>
            <Col>
                <div></div>
            </Col>
        </>
    );
};

export default EditSingleUser;
