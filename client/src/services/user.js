import axiosConfig from '../axiosConfig'

export const apiGetUser = async (userId) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/user/${userId}`
        })
        return response
    } catch (error) {
        console.log(error)
        return undefined;
    }
}