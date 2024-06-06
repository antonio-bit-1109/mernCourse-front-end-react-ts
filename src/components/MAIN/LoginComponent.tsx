import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

const LoginComponent = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    return (
        <>
            {" "}
            <Form>
                <Form.Group className="mb-3" controlId="nomeUtenteId">
                    <Form.Label>userName</Form.Label>
                    <Form.Control type="text" placeholder="inserisci nome utente" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordId">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="inserisci password" />
                </Form.Group>
            </Form>
        </>
    );
};

export default LoginComponent;
