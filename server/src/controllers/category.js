import * as categorySevices from '../services/category'

export const getCategories = async (req, res) => {
    try {
        const response = await categorySevices.getCategoriesServices()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            error: -1,
            message: error,
        })
    }
}