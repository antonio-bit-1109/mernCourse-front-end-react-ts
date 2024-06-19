import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
        if (error && "data" in error) {
            const myError = error as ITypeError;
            return <div>{myError.data.message}</div>;
        }
    }

    return null;
};

export default EsitoEditUser;
