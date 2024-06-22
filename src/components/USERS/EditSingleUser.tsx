import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { useEditUserMutation } from "../../redux/app/api/usersApiSlice";
import EsitoEditUser from "./EsitoEditUser";

const EditSingleUser = () => {
    const navigate = useNavigate();
    const { userToEdit } = useSelector((store: RootState) => store.user);

    const [AllRoles] = useState<string[]>(["admin", "impiegato", "ladro"]);
    const [id, setId] = useState<null | string>(null);
    const [username, setUsername] = useState<null | string>(null);
    const [roles, setRoles] = useState<null | string[]>(null);
    const [isActive, setIsActive] = useState<null | boolean>(null);
    const [message, setMessage] = useState<null | string>(null);
    const [editUser, { isSuccess, isError, isLoading, error, data }] = useEditUserMutation();

    useEffect(() => {
        if (userToEdit) {
            setId(userToEdit._id);
            setUsername(userToEdit.username);
            setRoles(userToEdit.roles);
            setIsActive(userToEdit.active);
        }
    }, [userToEdit]);

    const impostaRuolo = (stringaRuolo: string, array: string[] | null) => {
        if (!array) {
            console.log("roles è null.");
            return;
        }
        if (!array.includes(stringaRuolo)) {
            const newArray = [...array];
            newArray.push(stringaRuolo);
            setRoles(newArray);
            return;
        }
        setMessage("ruolo già inserito.");

        return;
    };
    //
    const handleDelete = (index: number, array: string[]) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setRoles(newArray);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && id && Array.isArray(roles) && isActive !== null) {
            editUser({ id: id, username: username, roles: roles, active: isActive });
        }
    };

    // quando viene mostrato il mesasge di ruolo gia inserito dopo 2sec sparisce
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    }, [message]);

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
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        {/* //id utente */}
                        <Form.Group hidden className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Id</Form.Label>
                            <Form.Control readOnly value={id ?? ""} type="text" placeholder="name@example.com" />
                        </Form.Group>
                        {/* username */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username ?? ""}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </Form.Group>{" "}
                        {/* ruoli */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ruoli</Form.Label>
                            <ul>
                                {roles &&
                                    roles.map((role, i) => (
                                        <li key={`my-${role}-${i}`}>
                                            {role}{" "}
                                            <FaDeleteLeft
                                                onClick={() => {
                                                    handleDelete(i, roles);
                                                }}
                                                color="red"
                                                className="ms-2"
                                                size={22}
                                            />
                                        </li>
                                    ))}
                            </ul>
                            <Form.Select
                                onChange={(e) => {
                                    const selectedString = e.target.value;
                                    impostaRuolo(selectedString, roles);
                                }}
                            >
                                <option>Seleziona i ruoli</option>
                                {AllRoles &&
                                    AllRoles.map((role, i) => (
                                        <option key={`option-${role}-${i}`} value={role}>
                                            {role}{" "}
                                        </option>
                                    ))}
                            </Form.Select>
                            {message && message}
                        </Form.Group>{" "}
                        {/* statoUtente */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Stato Utente</Form.Label>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Utente Attivo"
                                checked={!!isActive}
                                onChange={(e) => {
                                    setIsActive(e.target.checked);
                                }}
                            />{" "}
                        </Form.Group>
                        <Button type="submit">Modifica Utente</Button>
                    </Form>
                </div>
            </Col>
            <Col>
                <EsitoEditUser
                    isSuccess={isSuccess}
                    isError={isError}
                    isLoading={isLoading}
                    error={error}
                    data={data}
                />
            </Col>
        </>
    );
};

export default EditSingleUser;
