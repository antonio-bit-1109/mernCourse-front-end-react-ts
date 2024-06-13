import { useSelector } from "react-redux";
import { useDeleteNoteMutation, useGetAllUserNotesQuery } from "../../redux/app/api/notesApiSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ICustomError, IDecodedTokenStructure } from "../../interfaces/interfaces";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

const VIsualizzaNote = () => {
    const navigate = useNavigate();
    const { token } = useSelector((store: RootState) => store.token);
    const [userId, setUserId] = useState<string>("");

    const { data: notes, error, isLoading, refetch } = useGetAllUserNotesQuery(userId);
    const [deleteNoteFetch, { isLoading: delIsLoading, isSuccess: delIsSuccess, isError: delIsError, data: delData }] =
        useDeleteNoteMutation();

    const decriptToken = (token: string) => {
        const decodedToken: IDecodedTokenStructure = jwtDecode(token);
        return decodedToken.id;
    };

    useEffect(() => {
        if (token) {
            const userIdDecripted = decriptToken(token);
            setUserId(userIdDecripted);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);

    useEffect(() => {
        if (token) {
            const userIdDecripted = decriptToken(token);
            setUserId(userIdDecripted);
            return;
        }
    }, [token]);

    useEffect(() => {
        if (delIsSuccess) {
            refetch();
        }
        if (delIsError) {
            refetch();
        }
    }, [delIsSuccess, refetch, delIsError]);

    const deleteNote = async (idNote: string) => {
        await deleteNoteFetch({ IdNote: idNote, UserId: userId });
    };

    if (error) {
        const CustomError = error as ICustomError;
        if (CustomError.data) {
            return (
                <div>
                    {" "}
                    <Button
                        onClick={() => {
                            navigate("/singleUser");
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

    if (notes && notes.length > 0) {
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
                    {notes.map((note) => (
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
