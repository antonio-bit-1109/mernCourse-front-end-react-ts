export interface ICreateNoteResponse {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const EsitoCreateNewNote = ({ isLoading, isError, isSuccess, data }: ICreateNoteResponse) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error occurred</div>;
    }

    if (isSuccess) {
        return <div>Success! {data.message}</div>;
    }

    return null;
};

export default EsitoCreateNewNote;
