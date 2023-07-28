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
    if (info?.Asset) {
        const filterROI = roiList.filter(i => i.slug === info.Asset.slug);
        return calculate(inv, filterROI[0].roi);
    }
}

export const calculateDollarBaseOnROI = (info) => {
    if (info?.Asset) {
        const filterROI = roiList.filter(i => i.slug === info.Asset.slug);
        const roianual = filterROI[0].roi * 12;
        const total = roianual * info.market_data?.price_usd;
        return  info.market_data?.price_usd + total;
    }
}

export const getRoi = (info) => {
    if (info?.Asset) {
        const filterROI = roiList.filter(i => i.slug === info.Asset.slug);
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