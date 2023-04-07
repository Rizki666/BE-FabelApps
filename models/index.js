const dbconfig = require('../config/db.js');
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const quizModel = require('./quiz.js');
const materi = require('./materi.js');
const submateri = require('./submateri.js');
const book = require('./book.js');

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.user,
    dbconfig.password, {
        host: dbconfig.host,
        dialect: dbconfig.dialect,
        operatorAlias: false,
        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle,
        },
    });

    mysql.createConnection({
        host: dbconfig.host,
        user: dbconfig.user,
        password: dbconfig.password,
    }).then((connection) => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbconfig.database}`);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//untuk menjalankan model ada aplikasi
db.quiz = quizModel(sequelize, Sequelize);
db.materi = materi(sequelize, Sequelize);
db.submateri = submateri(sequelize, Sequelize);
db.book = book(sequelize, Sequelize);

//untuk menginisialisasi hubungan antar tabel, 
db.materi.belongsTo(db.submateri, {foreignKey: 'submateriId', as: 'submateri',  onDelete: 'cascade', hooks: true});
db.submateri.hasMany(db.materi, {foreignKey: 'submateriId', as: 'materi', onDelete: 'cascade', hooks: true});
db.materi.belongsTo(db.book, {foreignKey: 'bookId', as: 'book'});
db.book.hasMany(db.materi, {foreignKey: 'bookId', as: 'materi'});
db.quiz.belongsTo(db.book, {foreignKey: 'bookId', as: 'book'});
db.book.hasMany(db.quiz, {foreignKey: 'bookId', as: 'quiz'});


//syncronisasi model ke database
if (dbconfig.development === true) {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
    });
} else {
    db.sequelize.sync().then(() => {
        console.log('Db Sync Success');
    });
}

module.exports = db;