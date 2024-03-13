exports.up = knex =>
  knex.schema.createTable("notes", table => {
    // função do knex que cria uma tabela automaticamente
    // vamos usar o "table." e na frente vamos colocar o tipo do dado , e entre parenteses o nome que essa coluna vai ter dentro do database
    table.increments("id");
    table.text("title");
    table.text("description");

    // ele pega o id do usuário que criou a nota, ou seja se o usuário não existir não tem como a nota existir
    table.integer("user_id").references("id").inTable("users");

    // usa como padrão uma função do kenex para pegar a data e hora da criação ou modificação dessa nota
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("notes");
