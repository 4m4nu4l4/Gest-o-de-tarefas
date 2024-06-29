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
 * Usuários podem editar e excluir suas próprias tarefas.
 * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
 * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão */

const Task = require('../models/task');

class TaskController {
    async criarAtiv(nome, email, senha) {
        if (
            nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const task = await Task.create({ titulo, descricao, dataDeCriacao, dataDeConclusao, status, AutorId, ProjetoId });

        return task;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await Task.findByPk(id);

        if (!task) {
            throw new Error('Usuário não encontrado');
        }

        return task;
    }

    async alterarAtiv(id, titulo, descricao, dataDeCriacao, dataDeConclusao, status, AutorId, ProjetoId) {
        if (!id || !titulo || !descricao || !ProjetoId) {
            throw new Error('ID, título, descrição e ID do Projeto são obrigatórios');
        }

        const task = await this.buscarPorId(id);

        task.nome = nome;
        task.email = email;
        task.senha = senha;
        
        await task.save();

        return task;
    }

    async deletarAtiv(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await this.buscarPorId(id);

        await task.destroy(); 
    }

    async listarAtivs() {
        return Task.findAll();
    }
}

module.exports = TaskController;
