const request = require('supertest');
const Project = require('../src/models/project');

describe("Project Integration Tests", () => {
  beforeEach(async () => {
    await Project.destroy({ where: {}, truncate: true });
  });

  it("Deve adicionar um projeto", async () => {
    const dataTest = {
      nome: "Projeto de Teste",
      descricao: "Descrição do Projeto de Teste",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const response = await request(app)
      .post('/projects')
      .send(dataTest)
      .expect(201);

    const createdProject = response.body;

    expect(createdProject.nome).toBe(dataTest.nome);
    expect(createdProject.descricao).toBe(dataTest.descricao);
    expect(new Date(createdProject.dataDeCriacao)).toEqual(dataTest.dataDeCriacao);
    expect(createdProject.userId).toBe(dataTest.userId);
  });

  it("Deve buscar projeto pelo seu ID", async () => {
    const dataTest = {
      nome: "Projeto de Teste",
      descricao: "Descrição do Projeto de Teste",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const project = await Project.create(dataTest);

    const response = await request(app)
      .get(`/projects/${project.id}`)
      .expect(200);

    const foundProject = response.body;

    expect(foundProject.nome).toBe(dataTest.nome);
    expect(foundProject.descricao).toBe(dataTest.descricao);
    expect(new Date(foundProject.dataDeCriacao)).toEqual(dataTest.dataDeCriacao);
    expect(foundProject.userId).toBe(dataTest.userId);
  });

  it("Deve alterar um projeto", async () => {
    const dataTest = {
      nome: "Projeto de Teste",
      descricao: "Descrição do Projeto de Teste",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const project = await Project.create(dataTest);

    const updatedData = {
      nome: "Projeto Atualizado",
      descricao: "Descrição Atualizada",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const response = await request(app)
      .put(`/projects/${project.id}`)
      .send(updatedData)
      .expect(200);

    const updatedProject = response.body;

    expect(updatedProject.nome).toBe(updatedData.nome);
    expect(updatedProject.descricao).toBe(updatedData.descricao);
    expect(new Date(updatedProject.dataDeCriacao)).toEqual(updatedData.dataDeCriacao);
    expect(updatedProject.userId).toBe(updatedData.userId);
  });

  it("Deve deletar um projeto", async () => {
    const dataTest = {
      nome: "Projeto de Teste",
      descricao: "Descrição do Projeto de Teste",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const project = await Project.create(dataTest);

    await request(app)
      .delete(`/projects/${project.id}`)
      .expect(204);

    const foundProject = await Project.findByPk(project.id);
    expect(foundProject).toBeNull();
  });

  it("Deve listar todos os projetos", async () => {
    const dataTest1 = {
      nome: "Projeto de Teste 1",
      descricao: "Descrição do Projeto de Teste 1",
      dataDeCriacao: new Date(),
      userId: 1
    };

    const dataTest2 = {
      nome: "Projeto de Teste 2",
      descricao: "Descrição do Projeto de Teste 2",
      dataDeCriacao: new Date(),
      userId: 1
    };

    await Project.create(dataTest1);
    await Project.create(dataTest2);

    const response = await request(app)
      .get('/projects')
      .expect(200);

    const projects = response.body;
    expect(projects.length).toBe(2);
  });
}); 
