import React from "react";
import { Table } from 'react-bootstrap';
import { currencyFormat } from "../../helpers/common";
import bitcoin from "../calculator/img/bitcoin.png";
import cardano from "../calculator/img/cardano.png";
import ethereum from "../calculator/img/ethereum.png";
import "./styles.css";

const TableCrypto = ({ coinsInfo }) => {

    return (
        <>
            <div className="card-effect">
                <div>
                    <h4>Assets</h4>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Asset</th>
                                <th>Price USD</th>
                                <th>Change vs USD (1H)</th>
                                <th>Change vs USD (24H)</th>
                                <th>Reported MarketCap</th>
                                <th>Real Volume (24H)</th>
                                <th>Change vs USD (7D)</th>
                                <th>Change vs USD (30D)</th>
                                <th>Change vs USD (YTD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!coinsInfo.length && coinsInfo.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>
                                            <img
                                                src={
                                                    item.slug === "bitcoin" ? bitcoin
                                                        : item.slug === "ethereum" ? ethereum
                                                            : cardano
                                                }
                                                alt={item.slug}
                                                className="img-table"
                                            />
                                            {item?.name}
                                        </td>
                                        <td>{currencyFormat(item?.market_data?.price_usd)}</td>
                                        <td>{currencyFormat(item?.market_data?.percent_change_usd_last_1_hour)}</td>
                                        <td>{currencyFormat(item?.market_data?.percent_change_usd_last_24_hours)}</td>
                                        <td>{item?.marketcap?.current_marketcap_usd}</td>
                                        <td>{currencyFormat(item?.market_data?.real_volume_last_24_hours)}</td>
                                        <td>{currencyFormat(item?.roi_data?.percent_change_last_1_week)}</td>
                                        <td>{currencyFormat(item?.roi_data?.percent_change_last_1_month)}</td>
                                        <td>{currencyFormat(item?.roi_data?.percent_change_last_1_year)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default TableCrypto;