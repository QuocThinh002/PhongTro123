import {Attribute} from '../models'

export const getAttributesServices = async (attributesId) => {
    try {
        const attributes = await Attribute.findByPk(attributesId);
        return {
            success: !!attributes,  // Boolean indicates success or failure
            message: attributes ? 'atttributes found' : 'atttributes not found',
            data: attributes || null // Explicitly return null if attribute is not found
        };
    } catch {
        return {
            success: false,
            message: 'An error occurred while fetching the attributes',
            error: error.message || 'Unknown error' // Provide a user-friendly error message
        };
    }
}