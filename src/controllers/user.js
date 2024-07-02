const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'abacaxi';
const SALT_VALUE = 10;

class UserController {
    async criarUsuario(nome, email, senha) {
        if (nome === undefined || nome === '') {
            throw new Error('Nome é obrigatório');

        } if (email === undefined || email === '') {
            throw new Error('Email é obrigatório');

        } if (senha === undefined || senha === '') {
            throw new Error('Senha é obrigatória');
        }

        const UsuarioExiste = await User.findOne({ where: { email } });

        if (UsuarioExiste) {
            throw new Error('Email já cadastrado!');
        }

        const cypherSenha = await bcrypt.hash(senha, SALT_VALUE)

        const user = await User.create({
            nome,
            email,
            senha: cypherSenha,
        });

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
        if (id === undefined || id === '') {
            throw new Error('Id é obrigatório');

        } if (nome === undefined || nome === '') {
            throw new Error('Nome é obrigatório');

        } if (senha === undefined || senha === '') {
            throw new Error('Senha é obrigatória');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, SALT_VALUE)

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

    async login(email, senha) {
        if (email === undefined || senha === undefined) {
            throw new Error('Email e senha são obrigatórios.')
        }

        const user = await User.findOne({ where: { email } })
        

        if (!user) {
            throw new Error('Email inválido.')
        }
        console.log(user);

        const senhaCripto = bcrypt.compare(senha, user.senha)

        if (!senhaCripto) {
            throw new Error(' Senha inválida')
        }

        return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 60 * 60 })
    }


}


module.exports = new UserController();
