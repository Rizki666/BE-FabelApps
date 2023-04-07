const db = require('../models/index.js');
const book = db.book;

const create = async (req, res) => {
    try {
        const data = await book.create(req.body)
        res.json({
            message: "Book berhasil dibuat.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
                message: error.message,
                data: null,
        });
    }
}

const getAll = async (req, res) => {
    try {
        const quizzes = await book.findAll()
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
        await book.update(req.body, {
            where: {id}
        })
        const data = await book.findByPk(id, {rejectOnEmpty: true})
        res.json({
            message: "book updated successfully",
            data: data,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving book",
            data: null,
        })
    }
}

//MENGHAPUS
const deleteBook = async (req, res) => {
    const id = req.params.id
    try {
        const quizzes = await book.findByPk(id, {rejectOnEmpty: true})
        book.destroy({
            where: {id}
        })
        res.json({
            message: 'book deleted successfully',
            book : quizzes
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occured while retrieving book',
            data: null,
        })
    }
}

//MENAMPILKAN DATA QUIZ BERDASARKAN ID TERTENTU
const findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quizzes = await book.findByPk(id, {rejectOnEmpty: true})
        res.json({
            message: `Quizzes retrieved successfully with id=${id}`,
            data: quizzes
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Some error occurred while retrieving book',
            data: null
        })
    }
}

module.exports = {
    create,
    getAll,
    update,
    deleteBook,
    findOne
}