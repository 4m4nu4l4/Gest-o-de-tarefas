const Task = require('../model/task');

class TaskController {
    async criarAtiv(nome, email, senha) {
        if (
            nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const task = await Task.create({ nome, email, senha });

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

    async alterarAtiv(id, nome, email, senha) {
        if (
            id === undefined
            || nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
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
