
import * as postServices from '../services/post'


export const getPosts = async (req, res) => {
    try {
        let { page, limit } = req.query;
        
        page = page ? parseInt(page) : 1; 
        limit = limit ? parseInt(limit) : 20;
        
        const response = await postServices.getPostsServices(page, limit);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}