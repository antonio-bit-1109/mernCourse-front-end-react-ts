import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const mesiAnno = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
];

const FooterMain = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setyear] = useState<number | null>(null);
    const [hours, setHours] = useState<number | null>(null);
    const [minutes, setMinutes] = useState<number | null>(null);
    const [seconds, setSeconds] = useState<number | null>(null);

    const getCurrentDate = async () => {
        const date = new Date();
        const dateDay = date.getDate();
        setDay(dateDay);
        const dateMonth = date.getMonth();
        setMonth(dateMonth);
        const dateYear = date.getFullYear();
        setyear(dateYear);
        const dateHours = date.getHours();
        setHours(dateHours);
        const dateMinutes = date.getMinutes();
        setMinutes(dateMinutes);
        const dateSeconds = date.getSeconds();
        setSeconds(dateSeconds);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCurrentDate();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="sticky-bottom">
            {" "}
            <Row>
                <hr className="w-100" color="bg-black" />
                <Col xs="4">
                    <footer className="d-flex justify-content-start flex-column">
                        <div className="my-1">
                            {day && month && year && hours && minutes && seconds && `${day}-${mesiAnno[month]}-${year}`}{" "}
                            / {`${hours}:${minutes}:${seconds}`}
                        </div>
                    </footer>{" "}
                    <p
                        onClick={() => {
                            navigate("/login");
                        }}
                        className=" text-dark m-0"
                    >
                        Login
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default FooterMain;
