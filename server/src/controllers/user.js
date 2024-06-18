import * as userServices from "../services/user"

export const getUser = async (req, res) => {
    try {
        const {userId} = req.params
        const response = await userServices.getUserServices(userId);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}