const UserController = require('./userController');
const User = require('../models/user');

describe('UserController', () => {

  beforeAll(() => {
    userController = new UserController();
  });

  test('POST /usuarios - Deve criar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/user')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(userData.nome);
    expect(response.body.email).toBe(userData.email);
  });


  test('GET /user/:id - Deve buscar um usuário por ID', async () => {
    const novoUsuario = await userController.criarUsuario(userData.nome, userData.email, userData.senha);

    const response = await request(app)
      .get(`/user/${novoUsuario.id}`)
      .expect(200);

    expect(response.body.id).toBe(novoUsuario.id);
    expect(response.body.nome).toBe(novoUsuario.nome);
    expect(response.body.email).toBe(novoUsuario.email);
  });

  test('PUT /user/:id - Deve atualizar um usuário por ID', async () => {
    const novoUsuario = await userController.criarUsuario(userData.nome, userData.email, userData.senha);

    const response = await request(app)
      .put(`/user/${createdUser.id}`)
      .send({ nome: novoNome, email: createdUser.email, senha: createdUser.senha })
      .expect(200);

    expect(response.body.id).toBe(createdUser.id);
    expect(response.body.nome).toBe(novoNome);
    expect(response.body.email).toBe(createdUser.email);
  });

  test('DELETE /user/:id - Deve excluir um usuário existente', async () => {
    const response = await request(app)
    .delete(`/user/${createUser.id}`)
    .expect(204);

    const deleteUser = await User.findByPk(createUser.id);
    expect(deleteUser).toBeNull();
  });
});