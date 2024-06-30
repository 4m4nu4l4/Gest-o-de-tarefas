/*
 Tarefa
    * ID (único)
    * Título
    * Descrição
    * Data de criação
    * Data de conclusão (opcional)
    * Status (pendente, em andamento, concluída)
    * ID do Projeto (relacionamento com a entidade Projeto)
 
 * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
 * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
 *  */
 
 const { DataTypes } = require('sequelize');
const database = require('../config/database');
 
class Task {
    constructor() {
        this.model = database.db.define('tasks', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: DataTypes.STRING(100)
            },
            descrição: {
                type: database.db.Sequelize.STRING
            },
            dataDeCriação: {
                type: database.db.Sequelize.DATE
            },
            status: {
                type: database.db.Sequelize.STRING
            },
            projectId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id',
                }
            }
        });
    }
}
 
module.exports = (new Task()).model;