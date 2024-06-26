const TaskController = require('../controller/task');

class TaskApi {
    async criarAtiv(req, res) {
        const nome = req.body.nome
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const dataDeCriacao = req.body.dataDeCriacao;
        const AutorId = req.body.AutorId;
        const controller = new TaskController();

        try {
            const user = await controller.criarAtiv(nome, titulo, descricao, dataDeCriacao, AutorId);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarAtiv(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const controller = new TaskController();

        try {
            const user = await controller.alterarAtiv(Number(id), nome, titulo, descricao, dataDeCriacao, AutorId);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarAtiv(req, res) {
        const { id } = req.params;
        const controller = new TaskController();

        try {
            await controller.deletarAtiv(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarAtiv(req, res) {
        const controller = new TaskController();

        try {
            const users = await controller.listarAtiv();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = UserApi;