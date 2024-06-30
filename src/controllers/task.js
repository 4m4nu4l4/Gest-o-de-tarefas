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
    async criarAtiv(titulo, descricao, dataDeCriacao, dataDeConclusao, status, AutorId, ProjetoId) {
        if (!titulo) {
            throw new Error('Nome é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');

        } if (!dataDeConclusao) {
            throw new Error('Data de conclusão é obrigatória');

        } if (!status) {
            throw new Error('Status é obrigatória');

        } if (!AutorId) {
            throw new Error('AutorId é obrigatória');

        } if (!ProjetoId) {
            throw new Error('ProjetoId é obrigatória');
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
        if (!id) {
            throw new Error('Id é obrigatório');

        } if (!titulo) {
            throw new Error('Título é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de Criação é obrigatória');

        } if (!dataDeConclusao) {
            throw new Error('Data de Conclusão é obrigatória');

        } if (!status) {
            throw new Error('Status é obrigatória');

        } if (!AutorId) {
            throw new Error('AutorId é obrigatório');
            
        } if (!ProjetoId) {
            throw new Error('ProjetoId é obrigatório');
        }

        const task = await this.buscarPorId(id);

        task.titulo = titulo;
        task.descricao = descricao;
        task.dataDeCriacao = dataDeCriacao;
        task.dataDeCriacao = dataDeCriacao;
        task.dataDeConclusao = dataDeConclusao;
        task.status = status;
        task.AutorId = AutorId;
        task.ProjetoId = ProjetoId;

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

module.exports = new TaskController();
