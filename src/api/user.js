/* 
 Usuário
    * ID (único)
    * Nome
    * Email
    * Senha (hash)
    * Data de criação 

### Criação de Usuário

* O sistema deve permitir a criação de novos usuários com nome, email e senha.
* O email deve ser único para cada usuário.
* A senha deve ser armazenada de forma segura (hash).*/

// o email deve ser único para cada usuário
// a senha deve ser armazenada de forma segura

const UserController = require('../controllers/user');

class UserApi {
    async criarUsuario(req, res) {
        const { nome, email, senha } = req.body; 
        const controller = new UserController();

        const UsuarioExiste = await user.findOne({ where: { email } });  // função do sequelize
        if (UsuarioExiste) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

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

    async listarUsuarios(req, res) {
        const controller = new UserController();

        try {
            const users = await controller.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async buscarPorId(req, res) {
        const { id } = req.params;
        const controller = new ProjectController();

        try {
            const user = await controller.buscarPorId(id);
            return res.status(200).send(user);
        } catch {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserApi();