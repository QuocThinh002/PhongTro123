import express from 'express'

import * as attributeController from '../controllers/attribute'

const router = express.Router()

router.get('/:attributesId', attributeController.getAttributes)

export default router;