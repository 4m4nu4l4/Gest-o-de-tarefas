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
            descricao: {
                type: database.Sequelize.STRING
            },
            dataDeCriacao: {
                type: database.Sequelize.DATE
            }

        });
        
        // Cria a associação entre o projeto e a task
        Project.associate = function(model) {
            Project.hasMany(model.Task,{
                foreignKey: 'projectId',
                as: 'tasks'
            });
        }
    }
}


module.exports = Project;