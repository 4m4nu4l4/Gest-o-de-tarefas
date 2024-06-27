const { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } = require('@jest/globals');
const ServicoExercicio = require("../../src/services/pessoa");
const conexao = require("../../src/database");

describe('Testes do Serviço de Pessoa', () => {
   let servico;
   let transaction;

   beforeAll(async () => {
      servico = new ServicoExercicio();
      transaction = await conexao.transaction();
   });

   afterAll(async () => {
      await transaction.rollback();
      await conexao.close();
   });

   beforeEach(async () => {
      this.transaction = await conexao.transaction();
   });

   afterEach(async () => {
      await this.transaction.rollback();
   });

   it('Deve adicionar uma pessoa', async () => {
      const mockPessoa = { nome: "teste1", email: "testeadicionar", senha: "teste" };

      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction);

      expect(dataValues.nome).toBe(mockPessoa.nome);
      expect(dataValues.email).toBe(mockPessoa.email);
      expect(dataValues.senha).toBe(mockPessoa.senha);
   });

   it('Deve atualizar uma pessoa', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" };
      const mockPessoaAlterar = { nome: "teste2", email: "alterar23", senha: "teste2" };

      const adicionado = await servico.Adicionar(mockPessoa, this.transaction);

      const alterado = await servico.Alterar(adicionado.dataValues.id, mockPessoaAlterar, this.transaction);

      expect(alterado[0]).toBe(1);

      const pessoaAtualizada = await servico.BuscarPorId(adicionado.dataValues.id, this.transaction);
      expect(pessoaAtualizada.nome).toBe(mockPessoaAlterar.nome);
      expect(pessoaAtualizada.email).toBe(mockPessoaAlterar.email);
      expect(pessoaAtualizada.senha).toBe(mockPessoaAlterar.senha);
   });

   it('Deve deletar uma pessoa', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" };

      const adicionado = await servico.Adicionar(mockPessoa, this.transaction);
      const resposta = await servico.Deletar(adicionado.dataValues.id, this.transaction);

      expect(resposta).toBe(1);

      const pessoaDeletada = await servico.BuscarPorId(adicionado.dataValues.id, this.transaction);
      expect(pessoaDeletada).toBeNull();
   });
});