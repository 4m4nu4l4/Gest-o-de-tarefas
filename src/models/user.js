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

// o email deve ser único para cada usuário
// a senha deve ser armazenada de forma segura const database = require('../config/database');

class User {
    constructor() {
        this.model = database.define('users', {
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
            },
            dataDeCriacao: {
                type: database.Sequelize.DATE
            }
        });
        
    }
}

module.exports = User;