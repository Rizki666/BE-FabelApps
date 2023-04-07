const db = require("../models");
const Materi = db.materi;
const sub = db.submateri;

const createMateri = async (req, res) => {
    const { judul, materi, submateriId, bookId } = req.body;
    try {
        const data = await Materi.create({
            judul,
            materi,
            submateriId,
            bookId,
        });
        res.json({
            message: "Materi berhasil dibuat.",
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

const createSub = async (req, res) => {
    try {
        const data = await sub.create(req.body)
        res.json({
            message: "Submateri berhasil dibuat.",
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
        const materis = await Materi.findAll()
        res.json({
            message: "Materi retrieved successfully",
            data: materis,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        })
    }
}

const getDetail = async (req, res) => {
    const id = req.params.id
    try {
        const materis = await Materi.findOne({
            where: { id },
            include: [
                {
                    model: sub,
                    as: 'submateri',
                    attributes: ['id', 'judul', 'submateri'],
                },
                {
                    model: db.book,
                    as: 'book',
                    attributes: ['id', 'judul', 'deskripsi'],
                }
            ],
        })
        
        res.json({
            message: "Materi retrieved successfully",
            data: materis,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving book",
            data: null,
        })
    }
}

const updateMateri = async (req, res) => {
    const id = req.params.id
    try {
        await Materi.update(req.body, {
            where: { id }
        })
        const subs = await Materi.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: "Materi updated successfully",
            data: subs,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving book",
            data: null,
        })
    }
}

const updateSub = async (req, res) => {
    const id = req.params.id
    try {
        await sub.update(req.body, {
            where: { id }
        })
        const subs = await sub.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: "Materi updated successfully",
            data: subs,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Some error occured while retrieving book",
            data: null,
        })
    }
}

const deleteAll = async (req, res) => {
    //delete all materi and submateri
    const { id } = req.params;
    const babFind = await Materi.findByPk(id);
    if (babFind) {
      await Materi.destroy({
        where: {
          id: id,
        },
      });
      await sub.destroy({
        where: {
          id: babFind.submateriId,
        },
      });
      res.status(200).json({
        status: 200,
        message: "data successfully deleted",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "data not found",
      });
    }
}

module.exports = {
    createMateri,
    createSub,
    getAll,
    updateMateri,
    updateSub,
    deleteAll,
    getDetail,
}
