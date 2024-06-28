import express from 'express'

import * as priceRangeController from '../controllers/priceRange'

const router = express.Router()


router.post('/create', priceRangeController.createPriceRange)
router.get('/', priceRangeController.getPriceRanges)
router.patch('/:priceRangeId', priceRangeController.updatePriceRange)

export default router;