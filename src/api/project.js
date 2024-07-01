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

const controllerProject = require('../controllers/project');

class ProjectApi {
    async criarProjeto(req, res) {
        const {nome, descricao, dataDeCriacao, userId} = req.body;

        try {
            const project = await controllerProject.criarProjeto(nome, descricao, dataDeCriacao, userId);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataDeCriacao } = req.body;

        try {
            const project = await controllerProject.alterarProjeto(Number(id), nome, descricao, dataDeCriacao);
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params;

        try {
            await controllerProject.deletarProjeto(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarProjetos(req, res) {
    
        try {
            const projects = await controllerProject.listarProjetos();
            return res.status(200).send(projects);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }

    }
    async buscarPorId(req, res) {

        try {
            const project = await controllerProject.buscarPorId(id);
            return res.status(200).send(project);
        } catch {
            return res.status(400).send({ error: error.message })
        }
    }
    async buscarPorStatus(req, res) {
        const { status } = req.params;
        const controller = new ProjectController();

        try {
            const project = await controller.buscarPorStatus(status);
            return res.status(200).send(project);
        } catch {
            return res.status(400).send({ error: error.message })
        }
    }

}


module.exports = new ProjectApi();