import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
const socket = io("http://localhost:8080");

const Home = () => {
    const [coinsInfo, setCoinsInfo] = useState([]);

    useEffect(() => {
        socket.emit('response', true);
        socket.on('data', (data) => {
            if (data.length) {
                setCoinsInfo(data);
                setTimeout(() => {
                    socket.emit('response', true);
                }, 10000);
            }

        })
    }, []);

    console.log(coinsInfo);

    return (
        <div>
            <h1>Hola</h1>
        </div>
    )
};

export default Home;