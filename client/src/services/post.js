import axiosConfig from '../axiosConfig';

export const apiGetPosts = (page, limit) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post?page=${page}&limit=${limit}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})