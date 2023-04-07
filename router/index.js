const express = require('express');
const quizRoute = require('./quiz');
const jobsheetRoute = require('./jobsheet');
const bookRoute = require('./book');
const materiRoute = require('./materi');
const router = express();

router.use('/quiz', quizRoute);
router.use('/jobsheet', jobsheetRoute);
router.use('/book', bookRoute);
router.use('/materi', materiRoute);

module.exports = router;