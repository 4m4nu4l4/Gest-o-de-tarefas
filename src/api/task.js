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
 * Usuários podem editar e excluir suas próprias tarefas.
 * Usuários podem visualizar uma lista de tarefas por projeto com filtros por status.
 * Cada tarefa deve registrar a data de criação automaticamente e permitir a adição de uma data de conclusão */

const TaskController = require('../controllers/task');

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

module.exports = TaskApi;