/* Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão */

const Task = require('../models/task');

class TaskController {
    async criarAtiv(titulo, descricao, dataDeCriacao, dataDeConclusao, status) {
        if (!titulo) {
            throw new Error('titulo é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');

         } 
        //if (!dataDeConclusao) {
        //     throw new Error('Data de conclusão é obrigatória');

        // } 
        if (!status) {
            throw new Error('Status é obrigatória');

        }

        const task = await Task.create({ titulo, descricao, dataDeCriacao, dataDeConclusao, status});

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

    async alterarAtiv(id, titulo, descricao, dataDeCriacao, dataDeConclusao, status) {
        if (!id) {
            throw new Error('Id é obrigatório');

        } if (!titulo) {
            throw new Error('Título é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de Criação é obrigatória');

        } //if (!dataDeConclusao) {
        //     throw new Error('Data de Conclusão é obrigatória');

        // } 
        if (!status) {
            throw new Error('Status é obrigatória');

        }

        const task = await task.buscarPorId(id);

        if (!task) {
            throw new Error('Task não encontrada');
        }

        task.titulo = titulo;
        task.descricao = descricao;
        task.dataDeCriacao = dataDeCriacao;
        task.dataDeConclusao = dataDeConclusao;
        task.status = status;

        await task.save();

        return task;
    }

    async deletarAtiv(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await task.buscarPorId(id);

        await task.destroy();
    }

    async listarAtivs() {
        return Task.findAll();
    }
}

module.exports = new TaskController();
