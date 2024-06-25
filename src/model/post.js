const database = require('../config/database');

class Post {
    constructor() {
        this.model = database.define('posts', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING
            },
            conteudo: {
                type: database.Sequelize.TEXT
            },
            autorId: {
                type: database.Sequelize.INTEGER
            }
        });
    }
}

module.exports = (new Post).model;
