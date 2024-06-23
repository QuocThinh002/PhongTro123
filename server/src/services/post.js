import { Post, Image, Attribute, User } from '../models';

export const getPostsServices = async (page, limit) => {
    try {
        // Default values for page and limit
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;


        const { count, rows: posts } = await Post.findAndCountAll({
            raw: true,
            nest: true,
            include: [
                { model: Image, as: 'images', attributes: ['image'] },
                { model: Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: User, as: 'user', attributes: ['id', 'fullName', 'phone', 'zalo'] }
            ],
            attributes: ['id', 'title', 'star', 'address', 'description'],
            order: [['star', 'DESC'], ['createdAt', 'DESC']],
            offset: (page - 1) * limit,
            limit: limit
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
