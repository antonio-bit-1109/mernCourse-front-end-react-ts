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

const EsitoCreateUser = ({ isLoading, data, error }: IResponseProps) => {
    if (error) {
        return <div>{error.data.message}</div>;
    }
    if (isLoading) {
        return <div>caricamento...</div>;
    }

    if (data) {
        return <div>{data.message}</div>;
    }
};

export default EsitoCreateUser;
