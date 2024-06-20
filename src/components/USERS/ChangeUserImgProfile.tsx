import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useChangeImageProfileMutation, useGetSingleUserMutation } from "../../redux/app/api/usersApiSlice";
import React, { useEffect, useState } from "react";
import EsitoUploadImgUser from "./EsitoUploadImgUser";
import { setLoggedUser } from "../../redux/app/traditionalSlices/userReducer";
const ChangeUserImgProfile = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedUser } = useSelector((store: RootState) => store.user);

    const [changeImage, { isLoading, isSuccess, isError, data, error }] = useChangeImageProfileMutation();
    const [getSingleUser, { data: dataUser }] = useGetSingleUserMutation();
    const [loadedImg, setLoadedImg] = useState<File | null>(null);
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    const handleChangeImg = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loggedUser && loadedImg) {
            const formData = new FormData();
            formData.append("file", loadedImg);

            await changeImage({ userId: loggedUser._id, StringImage: formData });
        }
    };

    // se l'immagine viene uplodata con successo rifaccio la get per riavere le info dell userloggato
    useEffect(() => {
        if (data && loggedUser && !hasFetched) {
            getSingleUser({ id: loggedUser._id });
            setHasFetched(true);
        }

        return () => {
            setHasFetched(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, getSingleUser, loggedUser]);

    useEffect(() => {
        if (dataUser) {
            dispatch(setLoggedUser(dataUser));
            return;
        }
    }, [dataUser, dispatch]);

    return (
        <>
            <Col sm="10" md="6">
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Indietro
                </Button>
            </Col>
            <Col>
                <div className="my-5">
                    {" "}
                    <img
                        style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "cover",
                        }}
                        className="rounded-circle"
                        src={`${LocalHostPath}/upload/${loggedUser?.imageProfile}`}
                        alt="immagine profilo corrente"
                    />
                </div>
            </Col>
            <Col xs="10" md="6" lg="5">
                <div>
                    <Form
                        onSubmit={(e) => {
                            handleChangeImg(e);
                        }}
                    >
                        <Form.Control
                            name="ImageInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                // Assert the target as an HTMLInputElement
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files.length > 0) {
                                    setLoadedImg(target.files[0]);
                                }
                            }}
                        />
                        <Button type="submit">Cambia Immagine </Button>
                    </Form>
                </div>
            </Col>

            <EsitoUploadImgUser
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                data={data}
                error={error}
            />
        </>
    );
};

export default ChangeUserImgProfile;
