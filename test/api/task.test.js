const request = require('supertest');
const app = require('../../src/server');
const TaskController = require('../../src/controllers/task');

describe('TaskController', () => {
  //let taskController;

  beforeAll(() => {
    taskController = new TaskController();
  });

  it('POST /api/v1/task - Teste criar tarefa', async () => {
    const titulo = 'Nova Tarefa';
    const descricao = 'Descrição da tarefa';
    const dataDeCriacao = new Date().toISOString().split('T')[0];
    const dataDeConclusao = '2024-12-31';
    const status = 'pendente';
    const task = { titulo, descricao, dataDeCriacao, dataDeConclusao, status };

    const response = await request(app).post('/api/v1/task/').send(task);

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.titulo).toBe(titulo);
    expect(response.body.descricao).toBe(descricao);
    expect(response.body.dataDeCriacao).toBe(dataDeCriacao);
    expect(response.body.dataDeConclusao).toBe(dataDeConclusao);
    expect(response.body.status).toBe(status);
  });

  it('GET /api/v1/task/:id - Teste obter tarefa pelo ID', async () => {
    const buscarPorId = 1;

    const response = await request(app).get(`/api/v1/task/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body).toHaveProperty('titulo');
    expect(response.body).toHaveProperty('descricao');
    expect(response.body).toHaveProperty('dataDeCriacao');
    expect(response.body).toHaveProperty('dataDeConclusao');
    expect(response.body).toHaveProperty('status');
  });

  it('PUT /api/v1/task/:id - Teste atualizar tarefa', async () => {
    const buscarPorId = 1; 
    const updatedTitulo = 'Tarefa Atualizada';
    const updatedDescricao = 'Descrição atualizada da tarefa';
    const updatedDataDeCriacao = '2023-07-02';
    const updatedDataDeConclusao = '2024-12-31';
    const updatedStatus = 'concluída';
    const task = { titulo: updatedTitulo, descricao: updatedDescricao, dataDeCriacao: updatedDataDeCriacao, dataDeConclusao: updatedDataDeConclusao, status: updatedStatus };

    const response = await request(app).put(`/api/v1/task/${buscarPorId}`).send(task);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', buscarPorId);
    expect(response.body.titulo).toBe(updatedTitulo);
    expect(response.body.descricao).toBe(updatedDescricao);
    expect(response.body.dataDeCriacao).toBe(updatedDataDeCriacao);
    expect(response.body.dataDeConclusao).toBe(updatedDataDeConclusao);
    expect(response.body.status).toBe(updatedStatus);
  });

  it('DELETE /api/v1/task/:id - Teste deletar tarefa', async () => {
    const buscarPorId = 1; 

    const response = await request(app).delete(`/api/v1/task/${buscarPorId}`);

    console.log(response.body);
    expect(response.statusCode).toBe(204);
  });

  it('GET /api/v1/task - Teste listar todas as tarefas', async () => {
    const response = await request(app).get('/api/v1/task');

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
