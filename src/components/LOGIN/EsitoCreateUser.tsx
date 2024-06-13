// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoCreateUser = ({ isLoading, data, error }: any) => {
    if (error) {
        return <div>{error.data.message}</div>;
    }

    if (isLoading) {
        return <div>(caricamento...)</div>;
    }

    if (data) {
        return <div>{data.message}</div>;
    }
};

export default EsitoCreateUser;
