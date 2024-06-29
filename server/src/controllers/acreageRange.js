import * as acreageRangeServices from '../services/acreageRange'

export const createAcreageRange = async (req, res) => {
    try {
        const response = await acreageRangeServices.createAcreageRangeServices(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getAcreageRanges = async (req, res) => {
    try {
        const response = await acreageRangeServices.getAcreageRangesServices();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updateAcreageRange = async (req, res) => {
    try {
        const {acreageRangeId} = req.params
        const data = req.body;
        const response = await acreageRangeServices.updateAcreageRangeServices(acreageRangeId, data)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
    }
}