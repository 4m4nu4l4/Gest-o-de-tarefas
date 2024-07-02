const controllerTask = require('../controllers/task');

class TaskApi {
    async criarAtiv(req, res) {
        const { titulo, descricao, dataDeCriacao, dataDeConclusao} = req.body;
        const status = 'pendente';
        
        try {
            const task = await controllerTask.criarAtiv(titulo, descricao, dataDeCriacao, dataDeConclusao, status);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarAtiv(req, res) {
        const { id } = req.params;
        const { titulo, descricao, dataDeCriacao, dataDeConclusao, status} = req.body;

        try {
            const task = await controllerTask.alterarAtiv(Number(id), titulo, descricao, dataDeCriacao, dataDeConclusao, status);
            return res.status(200).send (task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarAtiv(req, res) {
        const { id } = req.params;

        try {
            await controllerTask.deletarAtiv(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarAtivs(req, res) {
       
        try {
            const tasks = await controllerTask.listarAtivs();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async buscarPorId(req, res) {

        try {
            const task = await controllerTask.buscarPorId(id);
            return res.status(200).send(task);
        } catch {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new TaskApi();