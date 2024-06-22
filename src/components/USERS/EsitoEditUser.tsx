import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface ITypeResponse {
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    error?: ITypeError | FetchBaseQueryError | SerializedError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export interface ITypeError {
    data: { status: number; message: string };
}

const EsitoEditUser = ({ isSuccess, isError, isLoading, error, data }: ITypeResponse) => {
    const { responseToEditSingleUserRefetch_listener } = useSelector((store: RootState) => store.listenerRefetch);

    if (isSuccess) {
        if (data && "message" && data.message) {
            return <div>{data.message}</div>;
        } else {
            return;
        }
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (isError) {
        if (responseToEditSingleUserRefetch_listener) {
            return <div>{responseToEditSingleUserRefetch_listener}</div>;
        }

        if (error && "data" in error) {
            const myError = error as ITypeError;
            return <div>{myError.data.message}</div>;
        }
    }

    return null;
};

export default EsitoEditUser;
