import { Container, Navbar } from "react-bootstrap";
import { LocalHostPath } from "../../functions/LocalHostPath";
import { useNavigate } from "react-router-dom";

const NavBarComp = () => {
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
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComp;