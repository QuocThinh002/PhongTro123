import express from 'express'

import * as acreageRangeController from '../controllers/acreageRange'

const router = express.Router()


router.post('/create', acreageRangeController.createAcreageRange)
router.get('/', acreageRangeController.getAcreageRanges)
router.patch('/:acreageRangeId', acreageRangeController.updateAcreageRange)

export default router;