import { AcreageRange } from '../models'

export const createAcreageRangeServices = async (data) => {
    try {
        const acreageRanges = await AcreageRange.create(data);
        return {
            success: !!acreageRanges,  // Boolean indicates success or failure
            message: acreageRanges ? 'acreageRanges created' : 'acreageRanges not created',
            data: acreageRanges || null // Explicitly return null if acreageRanges is not created
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while fetching the acreageRanges',
            error: error.message || 'Unknown error' // Provide a user-friendly error message
        };
    }
}

export const getAcreageRangesServices = async () => {
    try {
        const acreageRanges = await AcreageRange.findAll({
            raw: true,
            attributes: ["id", "title", "min", "max"]
        });
        return {
            success: !!acreageRanges,
            message: acreageRanges? 'get price range success' : 'get price range fail',
            acreageRanges
        }
    } catch (error) {
        return {
            success: false,
            message: 'get price range fail',
            error
        }
    }
}

export const updateAcreageRangeServices = async (acreageRangesId, data) => {
    try {
        await AcreageRange.update(
            data,
            {
                where: { id: acreageRangesId }
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