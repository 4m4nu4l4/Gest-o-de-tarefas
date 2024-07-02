const request = require('supertest');
const app = require('../../src/server');
const bcrypt = require('bcrypt');
const UserController = require('../../src/controllers/user');

describe('UserController', () => {
  //let UserController;

  beforeAll(() => {
    userController = new UserController();
  });

  it('Post /api/v1/user - Teste criar usuário', async () => {
    const nome = 'Manu';
    const email = 'emanuele@gmail.com.br';
    const senha = '1234';
    const hashedsenha = await bcrypt.hash(senha, 10);
    const user = { nome, email, senha: hashedsenha };

    const response = await request(app).post('/api/v1/user/').send(user);

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(nome);
    expect(response.body.email).toBe(email);

  });

  it('GET /api/v1/user/:id - Teste obter usuário pelo ID', async () => {
    const response = await request(app).get(`/api/v1/user/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('email');
  });

  it('PUT /api/v1/user/:id - Teste atualizar usuário', async () => {
    const updatednome = 'Manu';
    const updatedEmail = 'emanuele@gmail.com.br';
    const user = { nome: updatednome, email: updatedEmail };

    const response = await request(app).put(`/api/v1/user/${buscarPorId}`).send(user);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body.nome).toBe(updatednome);
    expect(response.body.email).toBe(updatedEmail);
  });

  it('DELETE /api/v1/user/:id - Teste deletar usuário', async () => {
    const response = await request(app).delete(`/api/v1/user/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(204);
  });

  it('GET /api/v1/user - Teste listar todos os usuários', async () => {
    const response = await request(app).get('/api/v1/user');

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});