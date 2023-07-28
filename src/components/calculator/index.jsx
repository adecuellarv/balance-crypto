import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import { calculateGain, getRoi, currencyFormat, calculateDollarBaseOnROI } from "../../helpers/common";
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
                                        <div className="card-effect exchange-cards">
                                            <div className="header-div-coin">
                                                <Row>
                                                    <Col xxs={12} md={6} lg={6}>
                                                        <img className="img-coin"
                                                            src={
                                                                item.slug === "bitcoin" ? bitcoin
                                                                    : item.slug === "ethereum" ? ethereum
                                                                        : cardano
                                                            }
                                                            alt={item.slug}
                                                        />
                                                        <h4>{item.name}</h4>
                                                    </Col>
                                                    <Col xxs={12} md={6} lg={6}>
                                                        <div>
                                                            <label className="label-small">Precio actual en dolar</label>
                                                            <h5 className="price-dolar">{currencyFormat(item?.market_data?.price_usd)} <span>USD</span></h5>
                                                        </div>
                                                        <div>
                                                            <label className="label-small">Precio proyectado en 12 meses</label>
                                                            <h5 className="price-dolar">{currencyFormat(calculateDollarBaseOnROI(item))} <span>USD</span></h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Row>
                                                <Col xxs={12} md={6} lg={6}>
                                                    <label>Ganancia mensual</label>
                                                    <h4 className="h4-numbers">{currencyFormat(calculateGain(item, value))} <span>USD</span></h4>
                                                </Col>
                                                <Col xxs={12} md={6} lg={6}>
                                                    <label>Ganancia Anual</label>
                                                    <h4 className="h4-numbers">{currencyFormat(calculateGain(item, value) * 12)} <span>USD</span></h4>
                                                </Col>
                                                <Col xxs={12} md={12} lg={12}>
                                                    <label>ROI mensual</label>
                                                    <h4>{getRoi(item)} <span>%</span></h4>
                                                </Col>
                                            </Row>
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