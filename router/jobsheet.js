const jobsheetController = require('../controllers/jobsheet')
const router = require('express').Router()

router.post('/one', jobsheetController.submitOne)
router.post('/many', jobsheetController.submitAll)
router.post('/bookid/:id', jobsheetController.submitByBookId)

module.exports = router