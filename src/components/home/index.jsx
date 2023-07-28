import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Calculator from "../calculator";
import logo from "./img/logo.svg";
import "./styles.css";

const socket = io("http://localhost:8080");

const Home = () => {
    const [coinsInfo, setCoinsInfo] = useState([]);

    useEffect(() => {
        socket.emit('response', true);
        socket.on('data', (data) => {
            if (data.length) {
                setCoinsInfo(data);
                setTimeout(() => {
                    //socket.emit('response', true);
                }, 10000);
            }
        })
    }, []);

    console.log(coinsInfo);

    return (
        <div className="home-page">
            <Container>
                <img className="logo" src={logo} />
                <Calculator
                    coinsInfo={coinsInfo}
                />
            </Container>
        </div>
    )
};

export default Home;