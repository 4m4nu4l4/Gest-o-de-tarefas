const Project = require('../model/project');

class ProjetoController {
    async criarProjeto(nome, descricao, dataDeCriacao, AutorId) {
        if (!nome || !descricao || !dataDeCriacao || !AutorId) {
            throw new Error('Nome, descrição, data de criação e AutorId são obrigatórios');
        }

        const projeto = await Project.create({ nome, descricao, dataDeCriacao, AutorId });

        return projeto;
    }

    async buscarPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const projeto = await Project.findByPk(id);

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        return projeto;
    }

    async alterarProjeto(id, nome, descricao, dataDeCriacao, AutorId) {
        if (!id || !nome || !descricao || !dataDeCriacao || !AutorId) {
            throw new Error('Id, nome, descrição, data de criação e AutorId são obrigatórios');
        }

        const projeto = await this.buscarPorId(id);

        projeto.nome = nome;
        projeto.descricao = descricao;
        projeto.dataDeCriacao = dataDeCriacao;
        projeto.AutorId = AutorId;
        await projeto.save();

        return projeto;
    }

    async deletarProjeto(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const projeto = await this.buscarPorId(id);

        await projeto.destroy();
    }

    async listarProjetos() {
        return Project.findAll();
    }
}

module.exports = ProjetoController;
