import axiosConfig from '../axiosConfig'



export const apiGetPriceRange = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/pricerange'
        })
        return response;
    } catch (error) {
        return error
    }
}