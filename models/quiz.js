const quiz = ( sequelize, Sequelize ) => {
    const Quiz = sequelize.define( 'quiz', {
        question: {
            type: Sequelize.STRING,
        },
        a: {
            type: Sequelize.STRING,
        },
        b: {
            type: Sequelize.STRING,
        },
        c: {
            type: Sequelize.STRING,
        },
        d: {
            type: Sequelize.STRING,
        },
        key: {
            type: Sequelize.STRING,
        },
        bookId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'books',
                key: 'id',
            },
        },
    });
    return Quiz;

}

// Path: models\quiz.js
module.exports = quiz;