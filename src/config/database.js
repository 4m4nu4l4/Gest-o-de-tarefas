const Sequelize = require('sequelize');

const database = new Sequelize(
    'Gestao-de-tarefas',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql' }
)

module.exports = database;