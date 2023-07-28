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

export const getRoi = (info) => {
    if (info?.Asset) {
        const filterROI = roiList.filter(i => i.slug === info.Asset.slug);
        return filterROI[0].roi;
    }
}