import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { FaDeleteLeft } from "react-icons/fa6";
import { useCreateNewUserMutation } from "../../redux/app/api/usersApiSlice";
import EsitoCreateUser from "./EsitoCreateUser";

const CreateNewUser = () => {
    const [ruoli, setRuoli] = useState<string[] | string>("");
    const [FormUsername, setUsername] = useState<string>("");
    const [FormPassword, setPassword] = useState<string>("");
    const [FormConfirmPassword, setConfirmPassword] = useState<string>("");

    const [createNewUser, { error, isLoading, data }] = useCreateNewUserMutation();

    const handleInsertion = (array: string[], value: string) => {
        array.forEach((elem) => {
            const esito = elem.includes(value);
            if (esito) {
                setRuoli(array.filter((elem) => elem !== value));
                return;
            } else {
                return;
            }
        });
    };

    const deleteFromState = (stringInArray: string, array: string[]) => {
        return array.filter((elem) => elem !== stringInArray);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Array.isArray(ruoli)) {
            createNewUser({ username: FormUsername, password: FormPassword, roles: ruoli });
            return;
        } else {
            console.error("lo stato ruoli in CreateNewUser.tsx is not an array.");
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Col sm="10" md="5" xl="4">
                <Form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    className=" my-5"
                >
                    <h2>Crea Nuovo Utente</h2>
                    <Form.Group className="mb-3" controlId="idUsernameCreateUser">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            value={FormUsername}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            placeholder="inserisci nome*"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="idPasswordCreateUser">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={FormPassword}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="Inserisci una password*"
                        />
                    </Form.Group>{" "}
                    <Form.Group className="mb-3" controlId="idConfermaPasswordCreateUser">
                        <Form.Label>Conferma Password</Form.Label>
                        <Form.Control
                            value={FormConfirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>{" "}
                    <Form.Group className="mb-3" controlId="idRuoliCreateUser">
                        <Form.Label>Ruoli</Form.Label>
                        <Form.Select
                            value={Array.isArray(ruoli) ? ruoli : undefined}
                            onChange={(e) => {
                                setRuoli([...ruoli, e.target.value]);
                                if (Array.isArray(ruoli)) {
                                    handleInsertion(ruoli, e.target.value);
                                    return;
                                } else {
                                    return;
                                }
                            }}
                        >
                            <option value=""> Inserisci ruoli dell'utente</option>
                            <option value="admin">Admin</option>
                            <option value="impiegato">Impiegato</option>
                            <option value="supervisore">Supervisore</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="idRuoliCreateUser">
                        {ruoli && Array.isArray(ruoli) && ruoli.length > 0 && (
                            <>
                                <Form.Label>Ruoli Selezionati</Form.Label>
                                {ruoli.map((ruolo, i) => (
                                    <div key={`my-custom-${i}`} className="d-flex align-items-center">
                                        <p className="fs-5 m-0"> {ruolo}</p>
                                        <FaDeleteLeft
                                            onClick={() => {
                                                setRuoli(deleteFromState(ruolo, ruoli));
                                            }}
                                            className="ms-2 text-red pointer"
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <EsitoCreateUser isLoading={isLoading} error={error} data={data} />
                </Form>
            </Col>
        </div>
    );
};

export default CreateNewUser;
