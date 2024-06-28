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
// a senha deve ser armazenada de forma seguraconst User = require('../models/user');

class UserController {
    async criarUsuario(nome, email, senha) {
        if (
            nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const UsuarioExiste = await user.findOne({ where: { email } });
        if (UsuarioExiste) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        // INSERT INTO users (nome, email, senha) VALUES (nome, email, senha);
        const user = await User.create({ nome, email, senha });

        return user;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async alterarUsuario(id, nome, email, senha) {
        if (
            id === undefined
            || nome === undefined
            || email === undefined
            || senha === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        user.senha = senha;
        // UPDATE users SET nome = nome, email = email, senha = senha WHERE id = id;
        await user.save();

        return user;
    }

    async deletarUsuario(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(id);

        await user.destroy();
    }

    async listarUsuarios() {
        return User.findAll();
    }
}

module.exports = UserController;
