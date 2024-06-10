import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useEditNoteMutation } from "../../redux/app/api/notesApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { useParams } from "react-router-dom";

interface IProps {
    EditFormsIsVisible: boolean;
    title: string;
    text: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const FormEditNote = ({ EditFormsIsVisible, title, text, setTitle, setText }: IProps) => {
    const param = useParams();

    const { token } = useSelector((store: RootState) => store.token);

    const [IdUser, setIdUser] = useState<string | null>("");
    //  const [title, setTitle] = useState<string>("");
    //  const [text, setText] = useState<string>("");
    const decriptToken = (token: string) => {
        const decriptedToken = jwtDecode(token);
        return decriptedToken;
    };

    useEffect(() => {
        if (token) {
            const tokenDecripted = decriptToken(token) as IDecodedTokenStructure;
            setIdUser(tokenDecripted.id);
        } else {
            setIdUser(null);
            console.error(" errore nella decriptazione del token in formEditNote.tsx");
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title !== "" || text !== "") {
            if (IdUser === null) {
                return console.error(" errore! Id User è null in formEditNote.tsx");
            }
            if (param.idNote) {
                editSingleNote({
                    userId: IdUser,
                    bodyData: { titleBody: title, textBody: text, IdNote: param.idNote },
                });
            }
            console.error("il parametro idNote non arriva correttamente in FormEditNote.tsx");
        }
        console.log("inserisci dati nel form");
    };

    // hook per modificare la singola nota
    const [editSingleNote, { data: respMessage, error, isLoading }] = useEditNoteMutation();

    return (
        <>
            <Col xs="10" md="6" className={`${EditFormsIsVisible ? "d-block" : "d-none"}`}>
                <Form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    className="my-5"
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
            <Col>
                {respMessage && (
                    <div>
                        <p>nota modificata con successo.</p>
                    </div>
                )}
                {error && (
                    <div>
                        <p>erore nella modifica della nota.</p>
                    </div>
                )}
                {isLoading && (
                    <div>
                        <p>caricamento...</p>
                    </div>
                )}{" "}
                {/* {title === "" && text === "" && (
                    <div>
                        <p>Inserisci i campi da modificare.</p>
                    </div>
                )} */}
            </Col>
        </>
    );
};

export default FormEditNote;
