const request = require('supertest');
const User = require('../src/models/user');

describe("User Integration Tests", () => {
    beforeEach(async () => {
        await User.destroy({ where: {}, truncate: true });
    });

    it("Deve adicionar um usuário", async () => {
        const service = new userRouter();

        const dataTest = {
            nome: "teste",
            email: "teste@gmail.com",
            senha: "12345"
        };

        const createdUser = await service.criarUsuario(dataTest);


        // const {dataValues} = await service.Adicionar(createdUser);

        expect(createdUser.nome).toBe(dataTest.nome);
        expect(createdUser.email).toBe(dataTest.email);
        expect(createdUser.senha).toBe(dataTest.senha);
    });

    it("Deve buscar um usuário pelo seu id", async () => {
        const dataTest = {
            nome: "teste",
            email: "teste@gmail.com",
            senha: "12345"
        };

        const user = await User.create(dataTest);

        const response = await request(app)
            .get(`/users/${user.id}`)                   
            .expect(200);

        const foundUser = response.body;

        expect(foundUser.nome).toBe(dataTest.nome);
        expect(foundUser.email).toBe(dataTest.email);
    });

    it("Deve alterar um usuário", async () => {
        const dataTest = {
            nome: "teste",
            email: "teste@gmail.com",
            senha: "12345"
        };
    
        const user = await User.create(dataTest);
    
        const updatedData = {
            nome: "teste atualizado",
            email: "teste@gmail.com",
            senha: "54321"
        };
    
        const response = await request(app)
            .put(`/users/${user.id}`)
            .send(updatedData)
            .expect(200);
    
        const updatedUser = response.body;
    
        expect(updatedUser.nome).toBe(updatedData.nome);
        expect(updatedUser.email).toBe(updatedData.email);
        expect(updatedUser.senha).not.toBe(updatedData.senha);
    });

    it("Deve deletar um usuário", async () => {
        const dataTest = {
            nome: "teste",
            email: "teste@gmail.com",
            senha: "12345"
        };
    
        const user = await User.create(dataTest);
    
        await request(app)
            .delete(`/users/${user.id}`)
            .expect(204);
    
        const foundUser = await User.findByPk(user.id);
        expect(foundUser).toBeNull();
    });
    
    it("Deve listar os usuários", async () => {
        const dataTest1 = {
            nome: "teste1",
            email: "teste1@gmail.com",
            senha: "12345"
        };
    
        const dataTest2 = {
            nome: "teste2",
            email: "teste2@gmail.com",
            senha: "54321"
        };
    
        await User.create(dataTest1);
        await User.create(dataTest2);
    
        const response = await request(app)
            .get('/users')
            .expect(200);
    
        const users = response.body;
        expect(users.length).toBe(2);
    });
    
});
