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

 const database = require('../config/database');

class Task {
    constructor() {
        this.model = database.define('tasks', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING
            },
            descrição: {
                type: database.Sequelize.STRING
            },
            dataDeCriação: {
                type: database.Sequelize.DATE
            },
            status: {
                type: database.Sequelize.STRING
            },
            projectId: {
                type: database.Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'projects',
                    key: 'id',
                }
            }
        });

        // Criando uma associação entre uma tarefa e o projeto
        Task.associate = function(model) {
            Task.belongsTo(model.Project,{
                foreignKey: 'projectId',
                as: 'project'
            });
        }
    }
}

module.exports = Task;