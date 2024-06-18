
import * as imageServices from '../services/image'


export const getImage = async (req, res) => {
    const { imgId } = req.params;
    try {
        const response = await imageServices.getImageServices(imgId);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}