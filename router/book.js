const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.post('/', bookController.create);
router.get('/', bookController.getAll);
router.get('/:id', bookController.findOne);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.deleteBook);

module.exports = router;