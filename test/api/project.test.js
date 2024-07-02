const request = require('supertest');
const app = require('../../src/server');
const ProjectApi = require('../../src/controllers/project');

describe('ProjectApi', () => {
 // let projectApi;

  beforeAll(() => {
    projectApi = new ProjectApi();
  });

  it('POST /api/v1/project - Teste criar projeto', async () => {
    const nome = 'Novo Projeto';
    const descricao = 'Descrição do projeto';
    const dataDeCriacao = '2023-07-01';
    const project = { nome, descricao, dataDeCriacao };

    const response = await request(app).post('/api/v1/project/').send(project);

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(nome);
    expect(response.body.descricao).toBe(descricao);
    expect(response.body.dataDeCriacao).toBe(dataDeCriacao);
  });

  it('GET /api/v1/project/:id - Teste obter projeto pelo ID', async () => {
    const buscarPorId = 1;

    const response = await request(app).get(`/api/v1/project/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('descricao');
  });

  it('PUT /api/v1/project/:id - Teste atualizar projeto', async () => {
    const buscarPorId = 1; 
    const updatedNome = 'Projeto Atualizado';
    const updatedDescricao = 'Descrição atualizada do projeto';
    const updatedDataDeCriacao = '2023-07-02';
    const project = { nome: updatedNome, descricao: updatedDescricao, dataDeCriacao: updatedDataDeCriacao };

    const response = await request(app).put(`/api/v1/project/${buscarPorId}`).send(project);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body.nome).toBe(updatedNome);
    expect(response.body.descricao).toBe(updatedDescricao);
    expect(response.body.dataDeCriacao).toBe(updatedDataDeCriacao);
  });

  it('DELETE /api/v1/project/:id - Teste deletar projeto', async () => {
    const buscarPorId = 1; 
    const response = await request(app).delete(`/api/v1/project/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(204);
  });

  it('GET /api/v1/project - Teste listar todos os projetos', async () => {
    const response = await request(app).get('/api/v1/project');

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /api/v1/project/status/:status - Teste buscar projeto pelo status', async () => {
    const status = 'ativo';

    const response = await request(app).get(`/api/v1/project/status/${status}`);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
