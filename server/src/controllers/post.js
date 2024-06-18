
import * as postServices from '../services/post'


export const getPosts = async (req, res) => {
    try {
        const response = await postServices.getPostsServices();

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}