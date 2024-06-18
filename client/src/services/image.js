import axiosConfig from '../axiosConfig';

export const apiGetImage = async (imgId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/image/${imgId}`
        });
        return response;
    } catch (error) {
        throw error;
    }
};
