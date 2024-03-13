exports.up = knex =>
  knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable(); // notNullable() obriga que esse campo seja preenchido

    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  
  });

exports.down = (knex) => knex.schema.dropTable("tags");
