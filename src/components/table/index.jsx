import React from "react";
import { Table } from 'react-bootstrap';
import { currencyFormat, jsonToFile } from "../../helpers/common";
import bitcoin from "../calculator/img/bitcoin.png";
import cardano from "../calculator/img/cardano.png";
import ethereum from "../calculator/img/ethereum.png";
import jsonimg from "./img/json.png";
import excelimg from "./img/excel.png";
import "./styles.css";

const TableCrypto = ({ coinsInfo }) => {

    const downloadFile = (type) => {
        const data = [];
        coinsInfo.map(item => {
            const obj = {
                asset: item.name,
                Price_USD: currencyFormat(item?.market_data?.price_usd),
                Change_vs_USD_1H: currencyFormat(item?.market_data?.percent_change_usd_last_1_hour),
                Change_vs_USD_24H: currencyFormat(item?.market_data?.percent_change_usd_last_24_hours),
                MarketCap: item?.marketcap?.current_marketcap_usd,
                Real_Volume_24H: currencyFormat(item?.market_data?.real_volume_last_24_hours),
                Change_vs_USD_7D: currencyFormat(item?.roi_data?.percent_change_last_1_week),
                Change_vs_USD_30D: currencyFormat(item?.roi_data?.percent_change_last_1_month),
                Change_vs_USD_YTD: currencyFormat(item?.roi_data?.percent_change_last_1_year)
            }
            data.push(obj);
        })

        jsonToFile('Table-crypto', data, type);
    }

    const jsonFileDownload = () => {
        const json_data = [];
        coinsInfo.map(item => {
            const obj = {
                asset: item.name,
                Price_USD: currencyFormat(item?.market_data?.price_usd),
                Change_vs_USD_1H: currencyFormat(item?.market_data?.percent_change_usd_last_1_hour),
                Change_vs_USD_24H: currencyFormat(item?.market_data?.percent_change_usd_last_24_hours),
                MarketCap: item?.marketcap?.current_marketcap_usd,
                Real_Volume_24H: currencyFormat(item?.market_data?.real_volume_last_24_hours),
                Change_vs_USD_7D: currencyFormat(item?.roi_data?.percent_change_last_1_week),
                Change_vs_USD_30D: currencyFormat(item?.roi_data?.percent_change_last_1_month),
                Change_vs_USD_YTD: currencyFormat(item?.roi_data?.percent_change_last_1_year)
            }
            json_data.push(obj);
        })
        const fileName = "Cryto.json";
        const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
        const jsonURL = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute("download", fileName);
        link.click();
        document.body.removeChild(link);
      };

    return (
        <>
            <div className="card-effect">
                <div>
                    <h4>Assets</h4>
                    <div className="download-buttons">
                        <img
                            src={jsonimg}
                            alt="jsonimg"
                            onClick={() => jsonFileDownload()}
                        />
                        <img
                            src={excelimg}
                            alt="excelimg"
                            onClick={() => downloadFile('xlsx')}
                        />
                    </div>
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