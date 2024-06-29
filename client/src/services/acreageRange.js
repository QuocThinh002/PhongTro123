import axiosConfig from '../axiosConfig'



export const apiGetAcreageRange = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/acreagerange'
        })
        return response;
    } catch (error) {
        return error
    }
}