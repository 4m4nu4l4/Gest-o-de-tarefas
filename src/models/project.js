/*
 Projeto
* ID (único)
* Nome
* Descrição
* Data de criação
* ID do Usuário (relacionamento com a entidade Usuário)
---------------
* Usuários autenticados podem criar novos projetos.
* Cada projeto deve ter um nome e descrição.
* Usuários podem editar e excluir seus próprios projetos.
* Usuários podem visualizar uma lista de seus projetos.
 
O nome dos projetos deve ter um limite de caracteres (por exemplo, no max 100 caracteres) */

const { DataTypes } = require('sequelize');
const database = require('../config/database');
 
class Project {
    constructor() {
        this.model = database.db.define('projects', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING(100)
            },
            descricao: {
                type: database.db.Sequelize.STRING
            },
            dataDeCriacao: {
                type: DataTypes.DATE
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                }
            }
        });
    }
}
 
 
module.exports = (new Project()).model;