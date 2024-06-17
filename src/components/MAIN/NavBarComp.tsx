import { Container, Navbar } from "react-bootstrap";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
import { useSendLogoutMutation } from "../../redux/app/api/tokenApiSlice";

const NavBarComp = () => {
    const navigate = useNavigate();

    const [doLogOut] = useSendLogoutMutation();

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
                                doLogOut(null);
                                navigate("/");
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
