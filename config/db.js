// Path: config\db.js
module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    database: 'be_fabelapps',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // development: true,
    test: true,
}