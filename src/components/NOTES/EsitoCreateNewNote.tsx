// export interface ICreateNoteResponse {
//     isLoading: boolean;
//     isError: boolean;
//     isSuccess: boolean;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data: any;
//     error: { data: { message: string } };
// }

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoCreateNewNote = ({ isLoading, isError, isSuccess, data, error }: any) => {
    // prendo la risposta arrivata dalla seconda fetch , nel listener, che ha rieffettuato una fetch con il token refreshato e la porto dove dovrebbe essere visualizzata.
    const { responseToCreateNoteRefetch_listener } = useSelector((store: RootState) => store.listenerRefetch);
    const [newResponse, setNewResponse] = useState<null | string>(null);

    useEffect(() => {
        if (responseToCreateNoteRefetch_listener) {
            setNewResponse(responseToCreateNoteRefetch_listener);
        }
    }, [responseToCreateNoteRefetch_listener]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        if (newResponse) {
            return <div>{newResponse}</div>;
        }

        return <div>{error.data.message}</div>;
    }

    if (isSuccess) {
        return <div>Success! {data.message}</div>;
    }

    return null;
};

export default EsitoCreateNewNote;
