import * as insertService from '../services/insert'


export const insert = async (req, res) => {
    try {
        const response = await insertService.insertService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Fail at insert controller: '  + error
        })
    }
}

export const insertOne = async (req, res) => {
    try {
        const response = await insertService.insertOne( req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Fail at insert controller: '  + error
        })
    }
}