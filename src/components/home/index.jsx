import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Container } from 'react-bootstrap';
import Calculator from "../calculator";
import TableCrypto from "../table";
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

    return (
        <div className="home-page">
            <Container>
                <img className="logo" src={logo} alt="logo" />
                <Calculator
                    coinsInfo={coinsInfo}
                />
                <TableCrypto
                    coinsInfo={coinsInfo}
                />
            </Container>
        </div>
    )
};

export default Home;