const book = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
        judul: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        deskripsi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });
    return Book;
};

module.exports = book;