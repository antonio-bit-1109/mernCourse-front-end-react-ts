import { SerializedError } from "@reduxjs/toolkit";

export interface MainState_Interface {
    randomState: number;
}

export interface IDecodedTokenStructure {
    UserInfo: {
        userId: string;
        username: string;
        roles: string[];
        active: boolean;
    };
    exp: number;
    iat: number;
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

export interface INote {
    _id: string;
    UserId: string;
    title: string;
    text: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    ticket: number;
    __v: number;
}

export interface IMessageResponse {
    message: string;
}

export interface ICreateNoteBody {
    userId: string;
    bodyData: {
        title: string;
        text: string;
    };
}

export interface IEditNoteBody {
    userId: string;
    bodyData: {
        IdNote: string;
        title: string;
        text: string;
    };
}

export interface IbodyData {
    userId: string;
    bodyData: {
        titleBody: string;
        textBody: string;
        IdNote: string;
    };
}

export interface Itoken {
    accessToken: string;
}

export interface DataAutentication {
    usernameBody: string;
    passwordBody: string;
}

export interface IUser {
    _id: string;
    username: string;
    roles: string[];
    active: boolean;
    __v: number;
    imageProfile: string;
}

export interface ICreateUserBody {
    username: string;
    password: string;
    roles: string[];
}

export interface Ireply {
    message: string;
}

export interface IresponseListenerUser {
    _id: string;
    username: string;
    active: boolean;
    __v: number;
}
