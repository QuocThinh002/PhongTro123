import axiosConfig from '../axiosConfig';

export const apiGetPosts = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post?page=${data.page}&limit=${data.limit}&priceMin=${data.priceMin}&priceMax=${data.priceMax}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})