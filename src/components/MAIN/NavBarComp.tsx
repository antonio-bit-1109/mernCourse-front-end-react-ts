import { Container, Navbar } from "react-bootstrap";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
import { useSendLogoutMutation } from "../../redux/app/api/tokenApiSlice";
import { RiLogoutBoxFill } from "react-icons/ri";

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
                            src={LocalHostPath + "/upload/default.png"}
                            width="30"
                            height="30"
                            className="d-inline-block align-top bg-light pointer"
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
                            className="text-light m-0 ms-auto"
                            onClick={() => {
                                doLogOut(null);
                                navigate("/");
                            }}
                        >
                            <RiLogoutBoxFill size={25} />
                        </p>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComp;
