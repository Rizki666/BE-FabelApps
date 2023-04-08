const db = require("../models");
const quiz = db.quiz;

const submitOne = async (req, res) => {
    const { id, answer } = req.body;
    try {
        const data = await quiz.findByPk(id, { rejectOnEmpty: true });
        if (data.key === answer) {
            res.json({
                message: "Jawaban benar",
                data: true,
            });
        } else {
            res.json({
                message: "Jawaban salah",
                data: false,
                jawaban: data.key,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}


const submitAll = async (req, res) => {
    const { answer } = req.body;
    try {
        const data = await quiz.findAll();
        let score = 0;
        const trueAnswer = [];
        const falseAnswer = [];
        let answerData = [];
        for (let i = 0; i < data.length; i++) {
            answerData.push(data[i].key);
        }
        for (let i = 0; i < answer.length; i++) {
            if (answerData[i] === answer[i]) {
                score++;
                trueAnswer.push(i + 1);
            } else {
                falseAnswer.push(i + 1);
            }
        }
        if (score === data.length) {
            res.json({
                message: "Jawaban anda",
                data: true,
                score: score,
                trueAnswer: trueAnswer,
                falseAnswer: falseAnswer,
                answerData: answerData,
            });
        } else {
            res.json({
                message: "Jawaban anda",
                data: false,
                score: score,
                trueAnswer: trueAnswer,
                falseAnswer: falseAnswer,
                answerData: answerData,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}

const submitByBookId = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    try {
        const data = await quiz.findAll({
            where: {
                bookId: id,
            },
        });
        let score = 0;
        const trueAnswer = [];
        const falseAnswer = [];
        let answerData = [];
        for (let i = 0; i < data.length; i++) {
            answerData.push(data[i].key);
        }
        for (let i = 0; i < answer.length; i++) {
            if (answerData[i] === answer[i]) {
                score++;
                trueAnswer.push(i + 1);
            } else {
                falseAnswer.push(i + 1);
            }
        }
        res.json({
            message: "Jawaban anda",
            score: score,
            trueAnswer: trueAnswer,
            falseAnswer: falseAnswer,
            answerData: answerData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        });
    }
}


module.exports = {
    submitOne,
    submitAll,
    submitByBookId,
};
