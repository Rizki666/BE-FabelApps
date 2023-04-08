const quizController = require('../controllers/quiz')
const router = require('express').Router()

router.post('/', quizController.create)
router.get('/', quizController.getAll)
router.get('/:id', quizController.findOne)
router.put('/:id', quizController.update)
router.delete('/:id', quizController.deleteQuiz)
router.get('/book/:id', quizController.getByBookId)

module.exports = router