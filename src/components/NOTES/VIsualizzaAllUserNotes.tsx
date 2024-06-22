import { useSelector } from "react-redux";
import { useDeleteNoteMutation, useGetAllUserNotesQuery } from "../../redux/app/api/notesApiSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ICustomError, IDecodedTokenStructure, INote } from "../../interfaces/interfaces";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const VIsualizzaNote = () => {
    const navigate = useNavigate();
    const { accessToken } = useSelector((store: RootState) => store.token);
    const [userId, setUserId] = useState<string>("");

    const {
        data: notes,
        isError,
        error,
        isLoading,
        refetch,
    } = useGetAllUserNotesQuery(userId, { skip: !userId, refetchOnMountOrArgChange: true });
    const [deleteNoteFetch, { isSuccess: delIsSuccess, isError: delIsError }] = useDeleteNoteMutation();
    const [allUserNotes, setAllUserNotes] = useState<null | INote[]>(null);

    // risposta della seconda fetch rieffettuata refreshando prima il token e poi portando la risposta nel componente per essere mappata
    const { responseToGetAllNotesRefetch_listener } = useSelector((store: RootState) => store.listenerRefetch);
    const [isListenerFetchHappened, setIsListenerFetchHappened] = useState(false);

    const decriptToken = (token: string) => {
        const decodedToken: IDecodedTokenStructure = jwtDecode(token);
        return decodedToken.UserInfo.userId;
    };

    useEffect(() => {
        if (accessToken) {
            const userIdDecripted = decriptToken(accessToken);
            setUserId(userIdDecripted);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    // useEffect(() => {
    //     if (userId) {
    //         refetch();
    //         return;
    //     }
    // }, [userId, refetch]);

    // useEffect(() => {
    //     if (accessToken) {
    //         const userIdDecripted = decriptToken(accessToken);
    //         setUserId(userIdDecripted);
    //         return;
    //     }
    // }, [accessToken]);

    useEffect(() => {
        if (delIsSuccess) {
            refetch();
        }
        if (delIsError) {
            refetch();
        }
    }, [delIsSuccess, refetch, delIsError]);

    useEffect(() => {
        if (notes && notes.length > 0 && !responseToGetAllNotesRefetch_listener) {
            setIsListenerFetchHappened(false);
            setAllUserNotes(notes);
            return;
        }

        if (responseToGetAllNotesRefetch_listener && responseToGetAllNotesRefetch_listener.length > 0 && !notes) {
            setAllUserNotes(responseToGetAllNotesRefetch_listener);
            setIsListenerFetchHappened(true);
            return;
        }

        return () => {
            setIsListenerFetchHappened(false);
        };
    }, [notes, responseToGetAllNotesRefetch_listener]);

    const deleteNote = async (idNote: string) => {
        await deleteNoteFetch({ IdNote: idNote, UserId: userId });
    };

    if (isError) {
        if (isListenerFetchHappened) {
            return (
                <>
                    <div>
                        {" "}
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            indietro
                        </Button>
                    </div>{" "}
                    <Col xs="10" md="8" lg="6" xl="4">
                        {allUserNotes &&
                            allUserNotes.map((note) => (
                                <Card key={`${note._id}`}>
                                    <FaRegTrashAlt
                                        onClick={() => {
                                            deleteNote(note._id);
                                        }}
                                        size={30}
                                        color="red"
                                        className="absolute-position-0 pointer"
                                    />
                                    <Card.Body>
                                        <Card.Title>{note.title}</Card.Title>
                                        <Card.Text>{note.text}</Card.Text>
                                        <Card.Text>
                                            Stato nota :{" "}
                                            {note.isCompleted ? (
                                                <span className="text-success fw-bold">completato</span>
                                            ) : (
                                                <span className="text-danger fw-bold"> non completato</span>
                                            )}
                                        </Card.Text>
                                        <Button
                                            onClick={() => {
                                                navigate(`/singleNote/${note._id}`);
                                            }}
                                            variant="primary"
                                        >
                                            More Info
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Col>
                </>
            );
        }

        const CustomError = error as ICustomError;
        if (CustomError.data) {
            return (
                <div>
                    {" "}
                    <Button
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        indietro
                    </Button>
                    {CustomError.data.message}
                </div>
            );
        } else {
            return (
                <div>
                    <Button
                        onClick={() => {
                            navigate("/singleUser");
                        }}
                    >
                        indietro
                    </Button>
                    errore durante il reperimento delle note.
                </div>
            );
        }
    }

    if (isLoading) {
        return <div>caricamento...</div>;
    }

    if (allUserNotes && allUserNotes.length > 0) {
        return (
            <>
                {" "}
                <Col>
                    {" "}
                    <Button
                        onClick={() => {
                            navigate("/singleUser");
                        }}
                    >
                        indietro
                    </Button>
                </Col>
                <Col xs="10" md="8" lg="6" xl="4">
                    {allUserNotes.map((note) => (
                        <Card key={`${note._id}`}>
                            <FaRegTrashAlt
                                onClick={() => {
                                    deleteNote(note._id);
                                }}
                                size={30}
                                color="red"
                                className="absolute-position-0 pointer"
                            />
                            <Card.Body>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text>{note.text}</Card.Text>
                                <Card.Text>
                                    Stato nota :{" "}
                                    {note.isCompleted ? (
                                        <span className="text-success fw-bold">completato</span>
                                    ) : (
                                        <span className="text-danger fw-bold"> non completato</span>
                                    )}
                                </Card.Text>
                                <Button
                                    onClick={() => {
                                        navigate(`/singleNote/${note._id}`);
                                    }}
                                    variant="primary"
                                >
                                    More Info
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </>
        );
    }

    if (notes && notes.length <= 0) {
        return <div> Nessuna nota disponibile per l'utente selezionato.</div>;
    }
};

export default VIsualizzaNote;
