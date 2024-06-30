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
const UserController = require('./user');

class ProjectController {
    async criarProjeto(nome, descricao, dataDeCriacao, AutorId) {
        if (!nome) {
            throw new Error('Nome é obrigatório');
        } if (!descricao) {
            throw new Error('Descrição é obrigatória');
        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');
        } if (!AutorId) {
            throw new Error('AutorId é obrigatório');
        }
        
        await UserController.buscarPorId(AutorId);

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
        if (!nome) {
            throw new Error('Nome é obrigatório');
        } if (!descricao) {
            throw new Error('Descrição é obrigatória');
        } if (!dataDeCriacao) {
            throw new Error('Data de criação é obrigatória');
        } if (!AutorId) {
            throw new Error('AutorId é obrigatório');
        }

        const projeto = await this.buscarPorId(id);

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

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

module.exports = ProjectController;
