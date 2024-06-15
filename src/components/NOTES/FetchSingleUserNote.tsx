import { Button, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleNoteMutation } from "../../redux/app/api/notesApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";
import { FaPen } from "react-icons/fa";
import FormEditNote from "./FormEditNote";

const FetchSingleNote = () => {
    const navigate = useNavigate();
    const param = useParams<{ idNote: string }>();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [idUser, setIdUser] = useState<string | null>(null);
    const [EditFormsIsVisible, setEditFormIsVisible] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");

    // hook per fare la fetch per recuperare singola nota
    const [getSingleNote, { data: nota, error, isLoading }] = useGetSingleNoteMutation();

    const decodingToken = useCallback(
        function () {
            if (accessToken !== null) {
                const decodedToken = jwtDecode(accessToken) as IDecodedTokenStructure;
                return decodedToken.UserInfo.userId;
            }
            if (!accessToken) {
                return null;
            }
        },
        [accessToken]
    );

    const asyncActions = useCallback(
        async function () {
            if (param.idNote && idUser) {
                await getSingleNote({ NoteId: param.idNote, UserId: idUser });
            }
        },
        [getSingleNote, idUser, param.idNote]
    );

    useEffect(() => {
        const idUser = decodingToken();
        if (idUser) {
            setIdUser(idUser);
            asyncActions();
        }
        // console.log(singolaNota);
    }, [decodingToken, param.idNote, idUser, getSingleNote, asyncActions]);

    const goBack = () => {
        navigate("/notes");
    };

    const ShowEditForm = async () => {
        setEditFormIsVisible(!EditFormsIsVisible);
        if (nota) {
            setTitle(nota.title);
            setText(nota.text);
        }
    };

    if (error) {
        return (
            <div>
                <Button onClick={goBack}>torna indietro </Button>
                errore nel reperimetno della nota.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <Button onClick={goBack}>torna indietro </Button>
                caricamento...
            </div>
        );
    }

    if (nota) {
        console.log(nota);
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <Col xs="10" md="5">
                    <Button onClick={goBack}>torna indietro </Button>
                    <div className=" border border-2 d-flex flex-column align-items-center mt-5 position-relative p-4">
                        <FaPen onClick={ShowEditForm} className="position-absolute customPOsition pointer" />
                        <p className="text-center">nota N° {nota.ticket}</p>
                        <h3 className="text-center">{nota.title}</h3>
                        <h4 className="text-center">{nota.text}</h4>
                        <p>
                            {nota.isCompleted ? (
                                <span className="text-success fw-bold">completato</span>
                            ) : (
                                <span className="text-danger fw-bold"> non completato</span>
                            )}{" "}
                        </p>
                    </div>
                </Col>

                <FormEditNote
                    EditFormsIsVisible={EditFormsIsVisible}
                    title={title}
                    text={text}
                    setTitle={setTitle}
                    setText={setText}
                    asyncActions={asyncActions}
                />
            </div>
        );
    }
};

export default FetchSingleNote;
