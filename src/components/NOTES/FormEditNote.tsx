import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import {
    useCheckCompletedNoteMutation,
    useEditNoteMutation,
    useUncheckNoteCompletedMutation,
} from "../../redux/app/api/notesApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { useParams } from "react-router-dom";
import { MdDoneOutline } from "react-icons/md";
import { VscError } from "react-icons/vsc";

export interface IProps {
    EditFormsIsVisible: boolean;
    title: string;
    text: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asyncActions: any;
}

const FormEditNote = ({ EditFormsIsVisible, title, text, setTitle, setText, asyncActions }: IProps) => {
    const param = useParams<{ idNote: string }>();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [IdUser, setIdUser] = useState<string>("");

    // hook per modificare la singola nota
    const [editSingleNote, { data: respMessage, error, isLoading }] = useEditNoteMutation();

    //hook per impostare la singola nota come completata
    const [
        checkCompletedNote,
        {
            isSuccess: isSuccessCheckCompleted,
            data: checkDataComplete,
            isError: isErrorNoteCompleted,
            isLoading: isLoadingNoteCompleted,
        },
    ] = useCheckCompletedNoteMutation();

    // hook per rimuovere il check dalla nota
    const [
        uncheckNote,
        {
            isLoading: isUncheckLoading,
            isError: isUNcheckError,
            isSuccess: isUncheckSuccess,
            data: uncheckDataComplete,
        },
    ] = useUncheckNoteCompletedMutation();

    const decriptToken = (token: string) => {
        const decriptedToken = jwtDecode(token);
        return decriptedToken;
    };

    useEffect(() => {
        if (accessToken) {
            const tokenDecripted = decriptToken(accessToken) as IDecodedTokenStructure;
            setIdUser(tokenDecripted.UserInfo.userId);
        } else {
            setIdUser("");
            console.error(" errore nella decriptazione del token in formEditNote.tsx");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title !== "" || text !== "") {
            if (IdUser === null) {
                return console.error(" errore! Id User è null in formEditNote.tsx");
            }
            if (param.idNote) {
                await editSingleNote({
                    userId: IdUser,
                    bodyData: { titleBody: title, textBody: text, IdNote: param.idNote },
                });

                await asyncActions();
            }
            console.error("il parametro idNote non arriva correttamente in FormEditNote.tsx");
        }
        console.log("inserisci dati nel form");
    };

    const checkNoteAsCompleted = async () => {
        if (!IdUser || !param.idNote) {
            console.error("Durante il check completato della nota idUser è null.");
            return;
        }
        await checkCompletedNote({ UserId: IdUser, NoteId: param.idNote });
        await asyncActions();
    };

    const uncheckNoteCompleted = async () => {
        if (!IdUser || !param.idNote) {
            console.error(" errore Durante l'uncheck della nota. idUser o idnote non sono valori accettati.");
            return;
        }
        await uncheckNote({ UserId: IdUser, NoteId: param.idNote });
        await asyncActions();
    };

    return (
        <>
            <div
                className={`${
                    EditFormsIsVisible ? "d-flex" : "d-none"
                } d-flex align-items-center column-gap-3 justify-content-center`}
            >
                <Col sm="10" md="12">
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        className="my-5 w-100"
                    >
                        <Form.Group className="mb-3" controlId="titleId">
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                type="text"
                                placeholder="Nuovo Titolo nota."
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="textId">
                            <Form.Label>Testo</Form.Label>
                            <Form.Control
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                type="text"
                                placeholder="Nuovo testo nota."
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Modifica
                        </Button>
                    </Form>
                </Col>
                <Col sm="10" md="4">
                    {" "}
                    <div
                        onClick={checkNoteAsCompleted}
                        className="d-flex justify-content-end bg-black ms-5 circle pointer mb-3"
                    >
                        <MdDoneOutline className="p-3" color="green" size={80} />
                    </div>
                    <div
                        onClick={uncheckNoteCompleted}
                        className="d-flex justify-content-end bg-black ms-5 circle pointer"
                    >
                        <VscError className="p-3" color="red" size={80} />
                    </div>
                </Col>
            </div>
            <div className={`${EditFormsIsVisible ? "d-flex justify-content-center" : "d-none"}`}>
                <Col>
                    {respMessage && (
                        <div>
                            <p className="text-center">nota modificata con successo.</p>
                        </div>
                    )}
                    {error && (
                        <div>
                            <p className="text-center">erore nella modifica della nota.</p>
                        </div>
                    )}
                    {isLoading && (
                        <div>
                            <p className="text-center">caricamento...</p>
                        </div>
                    )}
                    {isSuccessCheckCompleted ||
                        (isUncheckSuccess && (
                            <div>
                                <p className="text-center">
                                    {checkDataComplete?.message || uncheckDataComplete?.message}
                                </p>
                            </div>
                        ))}
                    {isErrorNoteCompleted ||
                        (isUNcheckError && (
                            <div>
                                <p className="text-center">errore durante il completamento della nota.</p>
                            </div>
                        ))}
                    {isLoadingNoteCompleted ||
                        (isUncheckLoading && (
                            <div>
                                <p className="text-center">caricamento...</p>
                            </div>
                        ))}{" "}
                </Col>
            </div>
        </>
    );
};

export default FormEditNote;
