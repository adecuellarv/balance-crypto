import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { calculateGain, getRoi } from "../../helpers/common";
import "./styles.css";
import bitcoin from "./img/bitcoin.png";
import cardano from "./img/cardano.png";
import ethereum from "./img/ethereum.png";

const Calculator = ({ coinsInfo }) => {
    const [value, setValue] = useState(0);
    console.log(coinsInfo)
    return (
        <div className="calculator">
            <Row>
                <Col xxs={12} md={3} lg={4}></Col>
                <Col xxs={12} md={6} lg={4}>
                    <div className="card-effect calulator-form">
                        <h4>Calculadora de Intercambio</h4>
                        <div>
                            <label>Tu inversión en dolares</label>
                            <input
                                placeholder="100"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <span>Escribe tu inversión</span>
                        </div>
                    </div>
                </Col>
                <Col xxs={12} md={3} lg={4}></Col>
                <Col xxs={12} md={12} lg={12}>
                    <Row>
                        {
                            !!coinsInfo.length && coinsInfo.map((item, key) => {
                                return (
                                    <Col xxs={12} md={4} lg={4} key={key}>
                                        <div className="card-effect">
                                            <div className="header-div-coin">
                                                <img className="img-coin" src={
                                                    item.Asset.slug === "bitcoin" ? bitcoin
                                                        : item.Asset.slug === "ethereum" ? ethereum
                                                            : cardano
                                                } />
                                                <h4>{item.Asset.name}</h4>
                                            </div>
                                            <div>
                                                <label>Ganancia mensual</label>
                                                <h4>${calculateGain(item, value)} <span>USD</span></h4>
                                            </div>
                                            <div>
                                                <label>Ganancia Anual</label>
                                                <h4>${calculateGain(item, value) * 12} <span>USD</span></h4>
                                            </div>
                                            <div>
                                                <label>ROI mensual</label>
                                                <h4>{getRoi(item)} <span>%</span></h4>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default Calculator;