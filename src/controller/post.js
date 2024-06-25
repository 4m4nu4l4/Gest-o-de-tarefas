const Post = require('../model/post');

class PostController {
  async criarPost(titulo, conteudo, autorId) {
    if (
      titulo === undefined
      || conteudo === undefined
      || autorId === undefined
    ) {
      throw new Error('Título, conteúdo e ID do autor são obrigatórios');
    }

    // criando nova postagem
    const post = await Post.create({ titulo, conteudo, autorId });

    return post;
  }

  async buscarPostPorId(id) {
    if (id === undefined) {
      throw new Error('ID da postagem é obrigatório');
    }

    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error('Postagem não encontrada');
    }

    return post;
  }

  async alterarPost(id, titulo, conteudo, autorId) {
    if (
      id === undefined
      || titulo === undefined
      || conteudo === undefined
      || autorId === undefined
    ) {
      throw new Error('ID, título, conteúdo e ID do autor são obrigatórios');
    }


    const post = await this.buscarPostPorId(id);
    if (!post) {
      throw new Error('Postagem não encontrada');
    }

    post.titulo = titulo;
    post.conteudo = conteudo;
    post.autorId = autorId;

    await post.save(); // aqui é melhor deixar com ou sem await?

    return post;
  }

  async deletarPost(id) {
    if (id === undefined) {
      throw new Error('ID da postagem é obrigatório');
    }

    const post = await this.buscarPostPorId(id);
    if (!post) {
      throw new Error('Postagem não encontrada');
    }
    await post.destroy();
  }

  async listarPosts() {
    return Post.findAll();
  }

  async listarPostPorUsuario(id) {
    if (id === undefined) {
      throw new Error("ID da postagem é obrigatório");
    }

    const post = await Post.findAll({
      where: {
        idUsuario: id,
      },
    });

    if (!post) {
      throw new Error("Postagem não encontrada");
    }

    return post;
  }
}
module.exports = PostController;
