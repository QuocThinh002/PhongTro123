import { Image } from '../models'

export const getImageServices = async (imgId) => {
    try {
        const image = await Image.findByPk(imgId);
        return {
            success: !!image,  // Boolean indicates success or failure
            message: image ? 'Image found' : 'Image not found',
            data: image || null // Explicitly return null if image is not found
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while fetching the image',
            error: error.message || 'Unknown error' // Provide a user-friendly error message
        };
    }
}