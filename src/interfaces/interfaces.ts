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
}

export interface ICustomError extends SerializedError {
    status: number;
    data: {
        message: string;
    };
}
