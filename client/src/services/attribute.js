import axiosConfig from '../axiosConfig'

export const apiGetAttributes = async (attributesId) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/attribute/${attributesId}`
        })
        return response
    } catch (error) {
        throw error
    }
}