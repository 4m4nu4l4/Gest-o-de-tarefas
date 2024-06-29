const Sequelize = require('sequelize');

const database = new Sequelize(
    'Gestao_de_tarefas',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql' }
)

module.exports = database;