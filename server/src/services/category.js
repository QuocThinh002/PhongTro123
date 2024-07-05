import {Category} from '../models'
import convertVietnameseSlug from '../utils/convertVietnameseSlug';

// GET all categories
export const getCategoriesServices = () => new Promise(async (resolve, reject) => {
    try {
        const categories = await Category.findAll({
            raw: true,
            attributes: ['code', 'value']
        });
        
        categories?.map(category => category.path = convertVietnameseSlug(category.value))

        resolve({
            success: !!categories,
            message: categories ? 'ok': 'fail get categories',
            categories
        })
    } catch (error) {
        reject(error)
    }
})