const Project = require('../model/project');

class ProjectController {
    async criarProjeto(nome, descricao, dataDeCriacao, AutorId) {
        if (
            nome === undefined
            || descricao === undefined
            || dataDeCriacao === undefined
            || AutorId === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        // INSERT INTO users (nome, email, senha) VALUES (nome, email, senha);
        const user = await User
            .create({ nome, email, senha });

        return user;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Projeto não encontrado');
        }

        return user;
    }

    async alterarProjeto(id, nome, descricao, dataDeCriacao, AutorId) {
        if (
            nome === undefined
            || descricao === undefined
            || dataDeCriacao === undefined
            || AutorId === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        Project.nome = nome;
        Projectroject.descricao = descricao;
        Project.dataDeCriacao = dataDeCriacao;
        project.AutorId = AutorId;
        // UPDATE projects SET nome = nome, email = email, senha = senha WHERE id = id;
        Project.save();

        return Project;
    }

    async deletarProjeto(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id);

        user.destroy();
    }

    async listarProjeto() {
        return Project.findAll();
    }
}

module.exports = ProjectController;