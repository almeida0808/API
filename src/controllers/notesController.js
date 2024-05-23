const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    // função de criar nota
    const { title, description, tags, links } = request.body; // pega os dados do request.body ja desestruturando
    const user_id = request.user.id; // pega o id do usuário de dentro do parametro

    const [note_id] = await knex("notes").insert({
      // ele inseri os dados dentro do data base, e guarda ppra gente o id da nota
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      //pega cada link que for adicionado pelo usuário, e pega o id da nota
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert); // inseri no banco de dados as informações capturadas acima

    const tagsInsert = tags.map((name) => {
      // pega o id da nota, o id do usuario, e o nome da tag
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert); // coloca dentro do database as inofrmações captradas acima

    response.json(); // envia como resposta como json
  }

  async show(request, response) {
    try {
      // Obtenha o ID da nota dos parâmetros da solicitação
      const { id } = request.params;

      // Obtenha o user_id do objeto request
      const user_id = request.user.id;

      // Consulte a nota no banco de dados usando o Knex
      const note = await knex("notes").where({ id }).first();

      // Verifique se a nota existe e se pertence ao usuário atual
      if (note && note.user_id === user_id) {
        // Consulte as tags e os links relacionados à nota
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
        const links = await knex("links")
          .where({ note_id: id })
          .orderBy("created_at");

        // Retorne os dados da nota junto com as tags e os links
        return response.json({ ...note, tags, links });
      } else {
        // Se a nota não existir ou não pertencer ao usuário atual, retorne uma resposta adequada
        return response.status(404).json({ error: "Nota não encontrada" });
      }
    } catch (error) {
      // Se ocorrer algum erro durante o processamento, retorne uma resposta de erro
      console.error("Erro ao recuperar a nota:", error);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;
    let notes;

    if (tags) {
      // caso tenha alguma tag passada como parametro, ele pesqusa dessa maneira:
      const filterTags = tags
        .split(",") // usa o split para separar as tags com virgula, caso tenha mais de uma
        .map((tag) => tag.trim()); // basicamente ele pega apenas as tags enves de pegar a virgula junto

      notes = await knex("tags")
        .select([
          // quais campos vamos selecionar de ambas tabelas
          "notes.title",
          "notes.id",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags) // whereIn funciona assim: "name" é o nome do campo e o filterTags são as tags que a gente pesquisa pelo query params
        .innerJoin("notes", "notes.id", "tags.note_id") // de dentro do notes pegue o notes.id, tags.note.id
        .groupBy("notes.id")
        .orderBy("title"); // ordene pelo tituloo]
    } else {
      // caso seja uma pesquisa sem ser por tags, ele faz assim:
      notes = await knex("notes") // busca dentro da tabela de notas usando o knex
        .where({ user_id }) // mostre apenas notas do usuário que esta querendo ver as notas
        .whereLike("title", `%${title}%`) // whereLike verifica se existe uma palavra chave dentro daquele campo que selecionamos. "title" é o campo que selecionamos e esse %{title}% é a palavra que está dentro do query params , as % significam que ele verifica tanto no inicio quanto no final, se existir essa palavra que eu estou pesquisando você me mostra
        .orderBy("title"); // ordena pelo title
    }

    const userTags = await knex("tags") // seleciona as tags
      .where({ user_id }); // filtra apenas as que tem o user id
    const NotesComTags = notes.map((note) => {
      // entra em todas as notas
      const noteTags = userTags.filter((tag) => tag.note_id === note.id); // filtra pra mostrar apenas as notas que tem o mesmo id da nota

      return {
        ...note, // coloca todas as notas pegas , dentro do noovo array
        tags: noteTags, // adiciona as tags junto com as notas
      };
    });
    return response.json({ NotesComTags }); // retorna como resposta as notas juntamente mostrando junto as tags
  }
}

module.exports = NotesController;
