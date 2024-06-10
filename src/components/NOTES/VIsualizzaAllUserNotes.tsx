import { useSelector } from "react-redux";
import { useGetAllUserNotesQuery } from "../../redux/app/api/notesApiSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ICustomError, IDecodedTokenStructure } from "../../interfaces/interfaces";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VIsualizzaNote = () => {
    const navigate = useNavigate();
    const { token } = useSelector((store: RootState) => store.token);
    const [userId, setUserId] = useState<string>("");

    const decriptToken = (token: string) => {
        const decodedToken: IDecodedTokenStructure = jwtDecode(token);
        return decodedToken.id;
    };

    useEffect(() => {
        if (token) {
            const userIdDecripted = decriptToken(token);
            setUserId(userIdDecripted);
        }
    }, [token]);

    const {
        data: notes,
        error,
        isLoading,
    } = useGetAllUserNotesQuery(userId, {
        skip: !userId,
    });
    // return <div> usernotes </div>;

    if (error) {
        const CustomError = error as ICustomError;
        if (CustomError.data) {
            return <div>{CustomError.data.message}</div>;
        } else {
            return <div>errore durante il reperimento delle note.</div>;
        }
    }
    if (isLoading) {
        return <div>caricamento...</div>;
    }

    if (notes && notes.length > 0) {
        return notes.map((note) => (
            <Card key={`${note._id}`}>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.text} </Card.Text>
                    <Card.Text>{note.isCompleted} </Card.Text>
                    <Button
                        onClick={() => {
                            navigate(`/login/singleNote/${note._id}`);
                        }}
                        variant="primary"
                    >
                        More Info
                    </Button>
                </Card.Body>
            </Card>
        ));
    }

    if (notes && notes.length <= 0) {
        return <div> Nessuna nota disponibile per l'utente selezionato.</div>;
    }
};

export default VIsualizzaNote;
