import express from 'express'
import * as imageController from '../controllers/image'

const router = express.Router()

router.get('/:imgId', imageController.getImage)

export default router;