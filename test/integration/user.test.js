const userRouter = require('../src/routes/user');

describe("User Integration Tests", () => {
    it("should add a user", async () => {
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
});
