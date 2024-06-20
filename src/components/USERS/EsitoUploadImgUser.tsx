import { Col } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EsitoUploadImgUser = ({ isLoading, isSuccess, isError, data, error }: any) => {
    if (isLoading) {
        return (
            <Col>
                {" "}
                <div className="mt-5">loading...</div>
            </Col>
        );
    }

    if (isSuccess) {
        return (
            <Col>
                {" "}
                <div className="mt-5">
                    <span className="fs-4 fw-bold text-info">{data.message}</span>
                </div>
            </Col>
        );
    }

    if (isError) {
        return (
            <Col>
                {" "}
                <div className="mt-5">
                    <span className="fs-4 fw-bold text-danger">{error.data.message}</span>
                </div>
            </Col>
        );
    }
};

export default EsitoUploadImgUser;
