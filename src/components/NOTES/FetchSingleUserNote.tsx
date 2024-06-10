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
    const param = useParams();
    const { token } = useSelector((store: RootState) => store.token);
    const [idUser, setIdUser] = useState<string | null | undefined>(null);
    const [EditFormsIsVisible, setEditFormIsVisible] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");

    // hook per fare la fetch per recuperare singola nota
    const [getSingleNote, { data: nota, error, isLoading }] = useGetSingleNoteMutation();

    const decodingToken = useCallback(
        function () {
            if (token !== null) {
                const decodedToken = jwtDecode(token) as IDecodedTokenStructure;
                console.log(decodedToken);
                return decodedToken.id;
            }
            if (!token) {
                return null;
            }
        },
        [token]
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
        setIdUser(idUser);
        asyncActions();
        // console.log(singolaNota);
    }, [decodingToken, param.idNote, idUser, getSingleNote, asyncActions]);

    const goBack = () => {
        navigate("/login/notes");
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
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <Col xs="10" md="5">
                    <Button onClick={goBack}>torna indietro </Button>
                    <div className=" border border-2 d-flex flex-column align-items-center mt-5 position-relative">
                        <FaPen onClick={ShowEditForm} className="position-absolute customPOsition pointer" />
                        <p>nota N° {nota.ticket}</p>
                        <h3>{nota.title}</h3>
                        <h4>{nota.text}</h4>
                        <p>{nota.isCompleted}</p>
                    </div>
                </Col>

                <FormEditNote
                    EditFormsIsVisible={EditFormsIsVisible}
                    title={title}
                    text={text}
                    setTitle={setTitle}
                    setText={setText}
                />
            </div>
        );
    }
};

export default FetchSingleNote;
