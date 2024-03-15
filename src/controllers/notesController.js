const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    // função de criar nota
    const { title, description, tags, links } = request.body; // pega os dados do request.body ja desestruturando
    const { user_id } = request.params; // pega o id do usuário de dentro do parametro

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
    const { id } = request.params; // retira o id que foi passado coomo parametro

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");
    return response.json({ ...note, tags, links });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { user_id, title, tags } = request.query;
    let notes;

    if (tags) {
      // caso tenha alguma tag passada como parametro, ele pesqusa dessa maneira:
      const filterTags = tags
        .split(",") // usa o split para separar as tags com virgula, caso tenha mais de uma
        .map((tag) => tag.trim()); // basicamente ele pega apenas as tags enves de pegar a virgula junto
     
        notes = await knex("tags")
        .select([
          "notes.title",
          "notes.id",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title" , `%${title}%`)
        .whereIn("name", filterTags) // whereIn funciona assim: "name" é o nome do campo e o filterTags são as tags que a gente pesquisa pelo query params
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("title")
      } 
    else {
      // caso seja uma pesquisa sem ser por tags, ele faz assim:
      notes = await knex("notes") // busca dentro da tabela de notas usando o knex
        .where({ user_id }) // mostre apenas notas do usuário que esta querendo ver as notas
        .whereLike("title", `%${title}%`) // whereLike verifica se existe uma palavra chave dentro daquele campo que selecionamos. "title" é o campo que selecionamos e esse %{title}% é a palavra que está dentro do query params , as % significam que ele verifica tanto no inicio quanto no final, se existir essa palavra que eu estou pesquisando você me mostra
        .orderBy("title"); // ordena pelo title
    }

    return response.json({ notes });
  }
}

module.exports = NotesController;
