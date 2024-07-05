
import * as postServices from '../services/post'


export const getPosts = async (req, res) => {
    try {
        let { page, limit, priceMin, priceMax, acreageMin, acreageMax, orderBy, categoryCode } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;
        priceMin = +priceMin;
        priceMax = +priceMax;
        acreageMin = +acreageMin;
        acreageMax = +acreageMax;
        
        const response = await postServices.getPostsServices(page, limit, priceMin, priceMax, acreageMin, acreageMax, orderBy, categoryCode);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}