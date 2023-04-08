const db = require('../models')
const quiz = db.quiz

// CREATE
const create = async (req, res) => {

    try {
        const data = await quiz.create(req.body)
        res.json({
            message: "quiz berhasil dibuat.",
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
const getAll = async (req, res) => {
    try {
        const quizzes = await quiz.findAll()
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
const update = async (req, res) => {
    const id = req.params.id
    try {
        await quiz.update(req.body, {
            where: {id}
        })
        const data = await quiz.findByPk(id, {rejectOnEmpty: true})
        res.json({
            message: "quiz updated successfully",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving quiz",
            data: null,
        })
    }
}

//MENGHAPUS
const deleteQuiz = async (req, res) => {
    const id = req.params.id
    try {
        const quizzes = await quiz.findByPk(id, {rejectOnEmpty: true})
        quiz.destroy()

        res.json({
            message: 'quiz deleted successfully',
            quiz : quizzes
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
const findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quizzes = await quiz.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.book,
                    as: 'book',
                    attributes: ['id', 'judul', 'deskripsi']
                }
            ]
        })
        res.json({
            message: `Quizzes retrieved successfully with id=${id}`,
            data: quizzes
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occurred while retrieving quiz',
            data: null
        })
    }
}

//MENAMPILKAN DATA QUIZ BERDASARKAN KATEGORI BUKU TERTENTU
const getByBookId = async (req, res) => {
    const id = req.params.id
    const quizzes = await quiz.findAll({
        where: {
            bookId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with categoryId=${id}`,
        data: quizzes
    })
}


module.exports = {
    create,
    getAll,
    update,
    deleteQuiz,
    findOne,
    getByBookId
}