const submateri = (sequelize, Sequelize) => {
    const Submateri = sequelize.define('submateri', {
        judul: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        submateri: {
            type: Sequelize.TEXT,
            allowNull: false,
            references: {
                model: 'submateri',
                key: 'id',
            },
        },
    });
    return Submateri;
};

module.exports = submateri;