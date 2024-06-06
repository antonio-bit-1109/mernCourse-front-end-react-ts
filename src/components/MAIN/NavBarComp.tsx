import { Container, Navbar } from "react-bootstrap";

const NavBarComp = () => {
    return (
        <>
            <Navbar className="bg-body-tertiary sticky-top">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img alt="" src="/img/logo.svg" width="30" height="30" className="d-inline-block align-top" />{" "}
                        React Bootstrap
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComp;
