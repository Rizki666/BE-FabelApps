const materi = (sequelize, Sequelize) => {
    const Materi = sequelize.define('materi', {
        judul: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        materi: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        submateriId : {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'submateri',
                key: 'id',
            },
        },
        bookId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id',
            },
        },
    });
    return Materi;
};

module.exports = materi;
// Path: models\materi.js