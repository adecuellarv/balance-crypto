import { utils, writeFile } from "xlsx";

const roiList = [
    {
        slug: 'bitcoin',
        roi: 0.05
    },
    {
        slug: 'ethereum',
        roi: 0.042
    },
    {
        slug: 'cardano',
        roi: 0.01
    }
];

export const calculate = (inv, roi) => {
    return parseFloat((inv * roi) + inv);
}

export const calculateGain = (info, inv) => {
    if (info?.slug) {
        const filterROI = roiList.filter(i => i.slug === info.slug);
        return calculate(inv, filterROI[0].roi);
    }
}

export const calculateDollarBaseOnROI = (info) => {
    if (info?.slug) {
        const filterROI = roiList.filter(i => i.slug === info.slug);
        const roianual = filterROI[0].roi * 12;
        const total = roianual * info.market_data?.price_usd;
        return info.market_data?.price_usd + total;
    }
}

export const calculateFromDollarToCoin = (info) => {
    if (info?.slug) {

    }
}

export const getRoi = (info) => {
    if (info?.slug) {
        const filterROI = roiList.filter(i => i.slug === info.slug);
        return filterROI[0].roi;
    }
}

export const currencyFormat = (number) => {
    const formatting_options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
    }

    const dollarString = new Intl.NumberFormat("en-US", formatting_options);
    return dollarString.format(number);
}

export const jsonToFile = (filename, data, type) => {
    const workbook = utils.book_new();
    const dataSheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, dataSheet);
    writeFile(workbook, `${filename}.${type}`);
}

export const getDataToFile = (coinsInfo) => {
    const data = [];
    if (coinsInfo?.length) {
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
    }
    return data;
}