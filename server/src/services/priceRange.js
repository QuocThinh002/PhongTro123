import { where } from 'sequelize';
import { PriceRange } from '../models'

export const createPriceRangeServices = async (data) => {
    try {
        const priceRange = await PriceRange.create(data);
        return {
            success: !!priceRange,  // Boolean indicates success or failure
            message: priceRange ? 'priceRange created' : 'priceRange not created',
            data: priceRange || null // Explicitly return null if priceRange is not created
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while fetching the priceRange',
            error: error.message || 'Unknown error' // Provide a user-friendly error message
        };
    }
}

export const getPriceRangesServices = async () => {
    try {
        const priceRanges = await PriceRange.findAll({
            raw: true,
            attributes: ["id", "title", "min", "max"]
        });
        return {
            success: !!priceRanges,
            message: priceRanges ? 'get price range success' : 'get price range fail',
            priceRanges
        }
    } catch (error) {
        return {
            success: false,
            message: 'get price range fail',
            error
        }
    }
}

export const updatePriceRangeServices = async (priceRangeId, data) => {
    try {
        await PriceRange.update(
            data,
            {
                where: { id: priceRangeId }
            })
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            message: 'update fail',
            error
        }
    }
}