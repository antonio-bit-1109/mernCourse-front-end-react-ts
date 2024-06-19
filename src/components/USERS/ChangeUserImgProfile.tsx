import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useChangeImageProfileMutation } from "../../redux/app/api/usersApiSlice";
import React, { useState } from "react";
const ChangeUserImgProfile = () => {
    const navigate = useNavigate();
    const { loggedUser } = useSelector((store: RootState) => store.user);

    const [changeImage, { isLoading, isSuccess, isError, data, error }] = useChangeImageProfileMutation();
    const [loadedImg, setLoadedImg] = useState<File | null>(null);
    //  const [error] = useState<any>(null);
    //  const [data] = useState<any>(null);

    const handleChangeImg = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loggedUser && loadedImg) {
            const formData = new FormData();
            formData.append("imageProfile", loadedImg);

            console.log("id utente", loggedUser._id);
            console.log("immagine", loadedImg);
            await changeImage({ userId: loggedUser._id, StringImage: formData });
        }
    };

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
                <div>
                    {" "}
                    <img src={`${LocalHostPath}/imgs/${loggedUser?.imageProfile}`} alt="immagine profilo corrente" />
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
        </>
    );
};

export default ChangeUserImgProfile;
