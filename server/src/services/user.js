import {User} from '../models'

export const getUserServices = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            }
        });
        return {
            success: !!user,
            message: user ? 'ok':'fail',
            user
        }
    } catch (error) {
        return error
    }
}