import { Op } from 'sequelize';
import { Post, Image, Attribute, User } from '../models';

export const getPostsServices = async (page, limit, priceMin, priceMax, acreageMin, acreageMax) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;
        priceMin = +priceMin;
        priceMax = +priceMax;
        acreageMin = +acreageMin;
        acreageMax = +acreageMax;
        

        console.log(priceMin, priceMax)
        console.log(acreageMin, acreageMax)

        // Create a flexible where clause
        const whereClause = {};

        if (priceMin && priceMax && priceMin < priceMax) {
            whereClause['$attributes.price$'] = { [Op.between]: [priceMin, priceMax] };
        } else if (priceMin) {
            whereClause['$attributes.price$'] = { [Op.gte]: priceMin };
        } else if (priceMax) {
            whereClause['$attributes.price$'] = { [Op.lte]: priceMax };
        }

        if (acreageMin && acreageMax && acreageMin < acreageMax) {
            whereClause['$attributes.acreage$'] = { [Op.between]: [acreageMin, acreageMax] };
        } else if (acreageMin) {
            whereClause['$attributes.acreage$'] = { [Op.gte]: acreageMin };
        } else if (acreageMax) {
            whereClause['$attributes.acreage$'] = { [Op.lte]: acreageMax };
        }
        
        const { count, rows: posts } = await Post.findAndCountAll({
            // logging: console.log,
            where: whereClause,
            raw: true,
            nest: true,
            include: [
                { model: Image, as: 'images', attributes: ['image'] },
                { model: Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: User, as: 'user', attributes: ['id', 'fullName', 'phone', 'zalo'] }
            ],
            attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
            order: [['star', 'DESC'], ['createdAt', 'DESC']],
            offset: (page - 1) * limit,
            limit
        });

        return {
            error: 0,
            message: 'Posts retrieved successfully',
            count,
            posts
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return {
            error: 1,
            message: 'Failed to retrieve posts',
            count: 0,
            posts: []
        };
    }
};
