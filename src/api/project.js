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
        const {nome, descricao, sataDeCriacao, AutorId} = req.body;
      
     

        try {
            const user = await controllerProject.criarProjeto(nome, descricao, dataDeCriacao, AutorId);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { nome, descricao, dataDeCriacao, AutorId } = req.body;

        try {
            const user = await controllerProject.alterarProjeto(Number(id), nome, descricao, dataDeCriacao, AutorId);
            return res.status(200).send(user);
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
            const users = await controllerProject.listarProjetos();
            return res.status(200).send(users);
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

}


module.exports = new ProjectApi();