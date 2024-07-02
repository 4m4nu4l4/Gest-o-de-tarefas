const controller = require('../controllers/user');

class UserApi {
    async criarUsuario(req, res) {
        const { nome, email, senha } = req.body;

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

        try {
            const user = await controller.alterarUsuario(Number(id), nome, email, senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarUsuario(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarUsuarios(req, res) {

        try {
            const users = await controller.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async login(req, res) {
        

        try {
            const { email, senha } = req.body
            console.log(email,senha);
            const token = await controller.login(email, senha)
            //console.log(token);

            res.status(200).send({ token })
        } catch (e) {

            res.status(400).send({ error: e.message })
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