import { Container, Navbar } from "react-bootstrap";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/app/traditionalSlices/tokenReducer";

const NavBarComp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <Navbar className=" bg-black sticky-top">
                <Container fluid>
                    <Navbar.Brand>
                        <img
                            onClick={() => {
                                navigate("/");
                            }}
                            alt=""
                            src={LocalHostPath + "/imgs/sorryImg.png"}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                    </Navbar.Brand>
                    <div className="d-flex gap-2 w-100">
                        {" "}
                        <p className=" text-light m-0">MyNavbar</p>
                        <p
                            onClick={() => {
                                navigate("/");
                            }}
                            className=" text-light m-0"
                        >
                            Home
                        </p>
                        <p
                            onClick={() => {
                                navigate("/AllUsers");
                            }}
                            className=" text-light m-0"
                        >
                            Get all users
                        </p>
                        <p
                            className="text-light m-0 ms-auto"
                            onClick={() => {
                                dispatch(clearToken());
                                navigate("/login");
                            }}
                        >
                            LogOut
                        </p>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComp;
