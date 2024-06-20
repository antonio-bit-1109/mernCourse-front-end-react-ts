import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { FaDeleteLeft } from "react-icons/fa6";
import { useCreateNewUserMutation } from "../../redux/app/api/usersApiSlice";
import EsitoCreateUser from "./EsitoCreateUser";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IStructureData_React_Hook_Form {
    confermaPassword: string;
    password: string;
    username: string;
}

const CreateNewUser = () => {
    const navigate = useNavigate();
    const [ruoli, setRuoli] = useState<string[] | string>("");
    const [createNewUser, { error, isLoading, data }] = useCreateNewUserMutation();
    const [erroreArrayRuoli, setErroreArrayRuoli] = useState<null | string>(null);

    useEffect(() => {
        if (erroreArrayRuoli) {
            setTimeout(() => {
                setErroreArrayRuoli(null);
            }, 2000);
        }
    }, [erroreArrayRuoli]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const password = watch("password");

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

    const submitTheFetch = (data: FieldValues) => {
        console.log(data);

        if (Array.isArray(ruoli)) {
            createNewUser({ username: data.username, password: data.password, roles: ruoli });
            reset();
            setRuoli("");
            return;
        } else {
            setErroreArrayRuoli("specifica i ruoli per l'utente creato.");
            console.error("lo stato ruoli in CreateNewUser.tsx is not an array.");
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Col sm="10" md="5" xl="4">
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    {" "}
                    indietro
                </Button>
                <Form onSubmit={handleSubmit(submitTheFetch)} className=" my-5">
                    <h2>Crea Nuovo Utente</h2>
                    <Form.Group className="mb-3" controlId="idUsernameCreateUser">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            {...register("username", {
                                required: "inserisci username",
                                pattern: {
                                    value: /^[A-Za-z0123456789]+$/i,
                                    message: "lo username può contenere solo lettere o numeri.",
                                },
                            })}
                            type="text"
                            placeholder="inserisci nome*"
                        />
                        {errors.username && (
                            <div className="text-danger">
                                {errors.username.message !== undefined && errors.username.message.toString()}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="idPasswordCreateUser">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            {...register("password", {
                                required: "inserisci una password",
                                minLength: {
                                    value: 8,
                                    message: "la password deve essere lunga almeno 8 caratteri.",
                                },
                                pattern: {
                                    value: /^[A-Za-z0123456789,.!?@#*]+$/i,
                                    message: "valore non consentito, provane un altro.",
                                },
                            })}
                            type="password"
                            placeholder="Inserisci una password*"
                        />
                        {errors.password && (
                            <div className="text-danger">
                                {errors.password.message !== undefined && errors.password.message.toString()}
                            </div>
                        )}
                    </Form.Group>{" "}
                    <Form.Group className="mb-3" controlId="idConfermaPasswordCreateUser">
                        <Form.Label>Conferma Password</Form.Label>
                        <Form.Control
                            {...register("confermaPassword", {
                                required: "conferma la password inserita.",
                                validate: (value) => value === password || "le password non corrispondono",
                            })}
                            type="password"
                            placeholder="Password"
                        />
                        {errors.confermaPassword && (
                            <div className="text-danger">
                                {errors.confermaPassword.message !== undefined &&
                                    errors.confermaPassword.message.toString()}
                            </div>
                        )}
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
                    {erroreArrayRuoli !== null && (
                        <div className={` ${erroreArrayRuoli ? "d-block" : "d-none"}`}>{erroreArrayRuoli}</div>
                    )}
                </Form>
            </Col>
        </div>
    );
};

export default CreateNewUser;
