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

const Project = require('../models/project');

class ProjectController {
    async criarProjeto(nome, descricao, dataDeCriacao, AutorId) {
        if (!nome || !descricao || !dataDeCriacao || !AutorId) {
            throw new Error('Nome, descrição, data de criação e AutorId são obrigatórios');
        }
// fazer um if que valide todos separadamente
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
// fazer um if que valide todos separadamente
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
        // if (!id) {
        //     throw new Error('Id é obrigatório');
        // }
        const projeto = await this.buscarPorId(id);

        await projeto.destroy();
    }

    async listarProjetos() {
        return Project.findAll();
    }
}

module.exports = ProjectController;
