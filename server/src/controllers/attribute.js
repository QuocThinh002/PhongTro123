import { getAttributesServices } from "../services/attribute";

export const getAttributes = async (req, res) => {
    try {
        const {attributesId} = req.params;
        const response = await getAttributesServices(attributesId)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error})
    }
}