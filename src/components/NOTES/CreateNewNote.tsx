import { Button, Col, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { useCreateNewNoteMutation } from "../../redux/app/api/notesApiSlice";
import EsitoCreateNewNote from "./EsitoCreateNewNote";

const CreateNewNote = () => {
    const navigate = useNavigate();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [decriptedUserID, setDecriptedUserID] = useState<string | null>(null);

    const [createNewNote, { isError, isLoading, isSuccess, data, error }] = useCreateNewNoteMutation();

    useEffect(() => {
        if (accessToken) {
            const userID = decriptToken(accessToken);
            if (userID) {
                setDecriptedUserID(userID);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    const decriptToken = (string: string) => {
        const decriptedToken: IDecodedTokenStructure = jwtDecode(string);
        return decriptedToken.UserInfo.userId;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        reset,
    } = useForm();

    const fetchCreateNote = (data: FieldValues) => {
        // console.log(data);
        if (decriptedUserID) {
            createNewNote({ userId: decriptedUserID, bodyData: { title: data.title, text: data.text } });
            reset();
        }
    };

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
                <Form onSubmit={handleSubmit(fetchCreateNote)} className=" my-5">
                    <h2>Crea Nuova Nota</h2>
                    <Form.Group className="mb-3" controlId="idUsernameCreateUser">
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control
                            {...register("title", {
                                required: "inserisci un titolo per la nota.",
                                pattern: {
                                    value: /^[A-Za-z0123456789?! ]+$/i,
                                    message: "valori non supportati. riprova.",
                                },
                            })}
                            type="text"
                            placeholder="inserisci titolo della nota"
                        />
                        {errors.title && (
                            <div className="text-danger">
                                {errors.title.message !== undefined && errors.title.message.toString()}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="idPasswordCreateUser">
                        <Form.Label>Testo</Form.Label>
                        <Form.Control
                            {...register("text", {
                                required: "inserisci un testo per la nota.",
                                pattern: {
                                    value: /^[A-Za-z0123456789?! ]+$/i,
                                    message: "valori non supportati. riprova.",
                                },
                            })}
                            type="text"
                            placeholder="inserisci testo della nota"
                        />
                        {errors.text && (
                            <div className="text-danger">
                                {errors.text.message !== undefined && errors.text.message.toString()}
                            </div>
                        )}
                    </Form.Group>{" "}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <EsitoCreateNewNote
                        isError={isError}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        data={data}
                        error={error}
                    />
                </Form>
            </Col>
        </>
    );
};

export default CreateNewNote;
