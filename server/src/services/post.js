import { Op } from 'sequelize';
import { Post, Image, Attribute, User } from '../models';

export const getPostsServices = async (page, limit, priceMin, priceMax, acreageMin, acreageMax) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;

        // Create a flexible where clause
        const whereClause = {};

        if (Number.isFinite(priceMin) && Number.isFinite(priceMax)) {
            whereClause['$attributes.price$'] = { [Op.between]: [priceMin, priceMax] };
        } else if (Number.isFinite(priceMin)) {
            whereClause['$attributes.price$'] = { [Op.gte]: priceMin };
        } else if (Number.isFinite(priceMax)) {
            whereClause['$attributes.price$'] = { [Op.lte]: priceMax };
        }

        if (Number.isFinite(acreageMin) && Number.isFinite(acreageMax)) {
            whereClause['$attributes.acreage$'] = { [Op.between]: [acreageMin, acreageMax] };
        } else if (Number.isFinite(acreageMin)) {
            whereClause['$attributes.acreage$'] = { [Op.gte]: acreageMin };
        } else if (Number.isFinite(acreageMax)) {
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
