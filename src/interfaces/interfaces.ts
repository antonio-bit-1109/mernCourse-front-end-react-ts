import { SerializedError } from "@reduxjs/toolkit";

export interface MainState_Interface {
    randomState: number;
}

export interface IDecodedTokenStructure {
    exp: number;
    iat: number;
    id: string;
    name: string;
    status: boolean;
    roles: string[];
}

// ------ destrutturazione degli oggetti ritornati dal createAPi di redux---------

export interface IDataResponse {
    message: string;
}
export interface IErrorResponse {
    data: { message: string };
    status: number;
}

export interface IResponseProps {
    isLoading: boolean;
    data?: IDataResponse;
    error?: IErrorResponse;
}

// ----------------------------------------------------------------------------------------------

export interface ICustomError extends SerializedError {
    status: number;
    data: {
        message: string;
    };
}
