import * as priceRangeServices from '../services/priceRange'

export const createPriceRange = async (req, res) => {
    try {
        const response = await priceRangeServices.createPriceRangeServices(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getPriceRanges = async (req, res) => {
    try {
        const response = await priceRangeServices.getPriceRangesServices();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updatePriceRange = async (req, res) => {
    try {
        const {priceRangeId} = req.params
        const data = req.body;
        const response = await priceRangeServices.updatePriceRangeServices(priceRangeId, data)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}