import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
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
            <Col sm="10" md="6">
                {/* //form nel quale inserire i dati dell utente da modificare */}
                <div className="my-4">
                    <h2>Modifica Utente</h2>
                    <Form>
                        <Form.Group hidden className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id</Form.Label>
                            <Form.Control value={id ?? ""} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username ?? ""} />
                        </Form.Group>{" "}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ruoli</Form.Label>
                            <Form.Control value={Array.isArray(roles) ? roles : ""} />
                        </Form.Group>{" "}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Stato Utente</Form.Label>
                            <Form.Control value={isActive === false ? "Inattivo" : isActive === true ? "Attivo" : ""} />
                        </Form.Group>
                    </Form>
                </div>
            </Col>
        </>
    );
};

export default EditSingleUser;
