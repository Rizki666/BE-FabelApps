const express = require('express');
const router = express.Router();
const materiController = require('../controllers/materi');

router.post('/', materiController.createMateri);
router.post('/sub', materiController.createSub);
router.get('/', materiController.getAll);
router.get('/:id', materiController.getDetail);
router.put('/:id', materiController.updateMateri);
router.put('/sub/:id', materiController.updateSub);
router.delete('/:id', materiController.deleteAll);

module.exports = router;