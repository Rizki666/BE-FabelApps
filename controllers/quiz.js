const db = require("../models");
const Quiz = db.quizzes;

//CREATE
exports.create = async (req, res) => {

    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "Quiz berhasil dibuat.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
                message: error.message,
                data: null,
        });
    }
}

//MENAMPILKAN SEMUA DATA
exports.getAll = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved successfully",
            data: quizzes,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        })
    }
}

//MENGUBAH DATA
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "Quizzes updated successfully",
            data: quiz,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        })
    }
}

//MENGHAPUS
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.destroy()

        res.json({
            message: 'Quiz deleted successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occured while retrieving quiz',
            data: null,
        })
    }
}

//MENAMPILKAN DATA QUIZ BERDASARKAN ID TERTENTU
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})
        res.json({
            message: `Quizzes retrieved successfully with id=${id}`,
            data: quiz
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occurred while retrieving quiz',
            data: null
        })
    }
}

//MENAMPILKAN DATA QUIZ BERDASARKAN KATEGORI TERTENTU
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            categoryId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with categoryId=${id}`,
        data: quizzes
    })
}

//MENAMPILKAN DATA QUIZ BERDASARKAN LEVEL TERTENTU
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with levelId=${id}`,
        data: quizzes,
    })
}