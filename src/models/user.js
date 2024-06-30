/*
 Usuário
    * ID (único)
    * Nome
    * Email
    * Senha (hash)
    * Data de criação
 
### Criação de Usuário
 
* O sistema deve permitir a criação de novos usuários com nome, email e senha.
* O email deve ser único para cada usuário.
* A senha deve ser armazenada de forma segura (hash).*/
 
const { DataTypes } = require("sequelize");
const database = require("../config/database");
// o email deve ser único para cada usuário
// a senha deve ser armazenada de forma segura const database = require('../config/database');
 
class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: database.db.Sequelize.INTEGER, 
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            senha: {
                type: database.db.Sequelize.STRING
            },
            dataDeCriacao: {
                type: DataTypes.DATE
            }
        });
    }
}
 
module.exports = (new User()).model;