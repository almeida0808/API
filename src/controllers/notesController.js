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
}

module.exports = NotesController;
