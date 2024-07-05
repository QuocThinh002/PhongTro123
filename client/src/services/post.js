import axiosConfig from '../axiosConfig';

export const apiGetPosts = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post?page=${data.currentPage}&limit=${data.limit}&priceMin=${data.priceMin}&priceMax=${data.priceMax}&acreageMin=${data.acreageMin}&acreageMax=${data.acreageMax}&orderBy=${data.orderBy}&categoryCode=${data.categoryCode}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post?limit=20&orderBy=createdAt-desc`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
