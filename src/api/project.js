const ProjectController = require('../controller/project');

class ProjectApi {
    async criarProjeto(req, res) {
        const nome = req.body.nome
        const descricao = req.body.descricao;
        const dataDeCriacao = req.body.dataDeCriacao;
        const AutorId = req.body.AutorId;
        const controller = new ProjectController();

        try {
            const user = await controller.criarProjeto(nome, descricao, dataDeCriacao, AutorId);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataDeCriacao, AutorId} = req.body;
        const controller = new ProjectController();

        try {
            const user = await controller.alterarProjeto(Number(id),nome, descricao, dataDeCriacao, AutorId);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params;
        const controller = new ProjectController();

        try {
            await controller.deletarProjeto(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarProjeto(req, res) {
        const controller = new ProjectController();

        try {
            const users = await controller.listarProjeto();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = ProjectApi;