/*1. Converter a estrutura de Usuário para MVC.
2. Converter a estrutura de Postagens para MVC.
3. Testar as rotas usando ferramentas como Postman ou curl.
4. Integrar as entidades no banco de dados.
5. Testar as rotas usando ferramentas como Postman ou curl e verificar o banco de dados.
6. Aplicar um middleware de validação as rotas de Postagens e as rotas de alteração, listagem e deleção de Usuários.
7. Testar as rotas usando ferramentas como Postman ou curl.
*/
const UserController = require('../controller/user');

class UserApi {
    async criarUsuario(req, res) {
        const nome = req.body.nome
        const email = req.body.email;
        const senha = req.body.senha;
        const controller = new UserController();

        try {
            const user = await controller.criarUsuario(nome, email, senha);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const controller = new UserController();

        try {
            const user = await controller.alterarUsuario(Number(id), nome, email, senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;
        const controller = new UserController();

        try {
            await controller.deletarUsuario(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarUsuario(req, res) {
        const controller = new UserController();

        try {
            const users = await controller.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = UserApi;