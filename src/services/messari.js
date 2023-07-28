import axios from 'axios';

export const getAsset = async (name) => {
    const infoAsset = await axios.get(`https://data.messari.io/api/v1/assets/${name}/metrics`);
    if (infoAsset?.data) {
        console.log(infoAsset?.data?.data);
    }
}