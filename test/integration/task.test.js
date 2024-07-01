const request = require('supertest');
const Task = require('../src/models/task');

describe("Task integration tasks", () => {
  beforeEach(async () => {
    await Task.destroy({ where: {}, truncate: true });
  });

  it("Deve adicionar um teste", async () => {
    const dataTest = {
      titulo: "Teste de Tarefa",
      descricao: "Descrição da Tarefa de Teste",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "pendente"
    };

    const response = await request(app)
      .post('/tasks')
      .send(dataTest)
      .expect(201);

    const createdTask = response.body;

    expect(createdTask.titulo).toBe(dataTest.titulo);
    expect(createdTask.descricao).toBe(dataTest.descricao);
    expect(new Date(createdTask.dataDeCriacao)).toEqual(dataTest.dataDeCriacao);
    expect(new Date(createdTask.dataDeConclusao)).toEqual(dataTest.dataDeConclusao);
    expect(createdTask.status).toBe(dataTest.status);
  });

  it("Deve buscar a tarefa pelo seu ID", async () => {
    const dataTest = {
      titulo: "Teste de Tarefa",
      descricao: "Descrição da Tarefa de Teste",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "pendente"
    };

    const task = await Task.create(dataTest);

    const response = await request(app)
      .get(`/tasks/${task.id}`)
      .expect(200);

    const foundTask = response.body;

    expect(foundTask.titulo).toBe(dataTest.titulo);
    expect(foundTask.descricao).toBe(dataTest.descricao);
    expect(new Date(foundTask.dataDeCriacao)).toEqual(dataTest.dataDeCriacao);
    expect(new Date(foundTask.dataDeConclusao)).toEqual(dataTest.dataDeConclusao);
    expect(foundTask.status).toBe(dataTest.status);
  });

  it("Deve alterar uma tarefa", async () => {
    const dataTest = {
      titulo: "Teste de Tarefa",
      descricao: "Descrição da Tarefa de Teste",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "pendente"
    };

    const task = await Task.create(dataTest);

    const updatedData = {
      titulo: "Tarefa Atualizada",
      descricao: "Descrição Atualizada",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "em andamento"
    };

    const response = await request(app)
      .put(`/tasks/${task.id}`)
      .send(updatedData)
      .expect(200);

    const updatedTask = response.body;

    expect(updatedTask.titulo).toBe(updatedData.titulo);
    expect(updatedTask.descricao).toBe(updatedData.descricao);
    expect(new Date(updatedTask.dataDeCriacao)).toEqual(updatedData.dataDeCriacao);
    expect(new Date(updatedTask.dataDeConclusao)).toEqual(updatedData.dataDeConclusao);
    expect(updatedTask.status).toBe(updatedData.status);
  });

  it("Deve deletar uma tarefa", async () => {
    const dataTest = {
      titulo: "Teste de Tarefa",
      descricao: "Descrição da Tarefa de Teste",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "pendente"
    };

    const task = await Task.create(dataTest);

    await request(app)
      .delete(`/tasks/${task.id}`)
      .expect(204);

    const foundTask = await Task.findByPk(task.id);
    expect(foundTask).toBeNull();
  });

  it("Deve listar todas as tarefas", async () => {
    const dataTest1 = {
      titulo: "Teste de Tarefa 1",
      descricao: "Descrição da Tarefa de Teste 1",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "pendente"
    };

    const dataTest2 = {
      titulo: "Teste de Tarefa 2",
      descricao: "Descrição da Tarefa de Teste 2",
      dataDeCriacao: new Date(),
      dataDeConclusao: new Date(Date.now() + 86400000),
      status: "em andamento"
    };

    await Task.create(dataTest1);
    await Task.create(dataTest2);

    const response = await request(app)
      .get('/tasks')
      .expect(200);

    const tasks = response.body;
    expect(tasks.length).toBe(2);
  });

});
