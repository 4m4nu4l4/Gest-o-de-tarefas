/* 
 Tarefa
    * ID (único)
    * Título
    * Descrição
    * Data de criação
    * Data de conclusão (opcional)
    * Status (pendente, em andamento, concluída)
    * ID do Projeto (relacionamento com a entidade Projeto)

 * Usuários autenticados podem criar novas tarefas associadas a projetos existentes.
 * Cada tarefa deve ter um título, descrição e status inicial como "pendente".
 *  */

const TaskController = require('../controllers/task');

class TaskApi {
    async criarAtiv(req, res) {
        const { titulo, descricao, dataDeCriacao, dataDeConclusao, AutorId, ProjetoId } = req.body;
        const status = 'pendente';
        const controller = new TaskController();

        if (!titulo || !descricao || !ProjetoId) {
            return res.status(400).send({ error: 'Título, descrição e ID do Projeto são obrigatórios.' });
        }

        try {
            const user = await controller.criarAtiv(nome, titulo, descricao, dataDeCriacao, AutorId);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarAtiv(req, res) {
        const { id } = req.params;
        const { titulo, descricao, dataDeCriacao, dataDeConclusao, status, AutorId, ProjetoId } = req.body;
        const controller = new TaskController();

        try {
            const tarefa = await controller.alterarAtiv(Number(id), titulo, descricao, dataDeCriacao, dataDeConclusao, status, AutorId, ProjetoId);
            return res.status(200).send(tarefa);
        } catch (error) {
            return res.status(400).send({ error: error.message });
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
            const tarefas = await controller.listarAtiv();
            return res.status(200).send(tarefas);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = TaskApi;