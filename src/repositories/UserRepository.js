const sqliteConnection = require("../database/sqlite"); // importa a função que faz a conexão com nosso server

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection(); // conecta nosso controle de usuários com o database

    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]); // ele procura dentro de toda a tabela se existe um email igual o do usuário que esta sendo criado esse (?) é substituido pelo dado(email) que foi informado entre []
    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection(); // conecta nosso controle de usuários com o database
    const user_id = await database.run(
      "INSERT INTO users (name, email , password) VALUES (?, ?, ?)",
      [name, email, password] // passamos como parametro os dados capturados pelo request.body e a senha nos passamos ela jácriptografada
    );
    return { id: user_id };
  }
}
module.exports = UserRepository;
