import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleNoteMutation } from "../../redux/app/api/notesApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IDecodedTokenStructure } from "../../interfaces/interfaces";

const FetchSingleNote = () => {
    const { token } = useSelector((store: RootState) => store.token);
    const [idUser, setIdUser] = useState<string>("");

    const decodingToken = () => {
        if (token !== null) {
            const decodedToken = jwtDecode(token) as IDecodedTokenStructure;
            console.log(decodedToken);
            return decodedToken.id;
        } else {
            console.error("il token che stai passando è null.");
        }
    };

    useEffect(() => {
        if (token) {
            const idUser = decodingToken();
            setIdUser(idUser);
        }
    }, [decodingToken, token]);

    const navigate = useNavigate();
    const param = useParams();
    console.log(param);

    const goBack = () => {
        navigate("/login/notes");
    };

    const { data: note, error, isLoading } = useGetSingleNoteMutation({ idNote: param.idNote, UserId: idUser }, {});

    return (
        <div>
            <Button onClick={goBack}>torna indietro </Button>
        </div>
    );
};

export default FetchSingleNote;
