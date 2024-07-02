const Project = require('../models/project');

class ProjectController {
    async criarProjeto(nome, descricao, dataDeCriacao, userId) {
        if (!nome) {
            throw new Error('Nome é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');

        } if (!userId) {
            throw new Error('userId é obrigatório');
        }
        
       // await ProjectController.buscarPorId(ProjectId);

        const projeto = await Project.create({ nome, descricao, dataDeCriacao, userId });

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

    async buscarPorStatus(status) {
        if (!status) {
            throw new Error('status não encontrado');
        }

        const projeto = await Project.findAll({ where: { status } });

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        return projeto;
    }

    async alterarProjeto(id, nome, descricao, dataDeCriacao, userId) {
        if (!nome) {
            throw new Error('Nome é obrigatório');

        } if (!descricao) {
            throw new Error('Descrição é obrigatória');

        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');

        } if (!userId) {
            throw new Error('userId é obrigatório');
        }

        const projeto = await this.buscarPorId(id);

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        projeto.nome = nome;
        projeto.descricao = descricao;
        projeto.dataDeCriacao = dataDeCriacao;
        projeto.userId = userId;

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

module.exports = new ProjectController();