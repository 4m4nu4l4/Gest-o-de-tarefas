const database = require('../config/database');

class Project {
    constructor() {
        this.model = database.define('projects', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.Sequelize.STRING
            },
            email: {
                type: database.Sequelize.STRING
            },
            senha: {
                type: database.Sequelize.STRING
            }
        });
    }
}

module.exports = (new Project).model;