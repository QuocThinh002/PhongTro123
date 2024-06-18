import {Post} from '../models'

export const getPostsServices = async () => {
    try {
        const posts = await Post.findAll({
            raw: true,
            order: [
                ['star', 'DESC'],
                ['createdAt', 'DESC'],
            ],
        });
        return {
            error: posts ? 0 : 1,
            message: posts ? 'ok':'fail posts',
            posts,
        }
    } catch (error) {
        return {error}
    }
}