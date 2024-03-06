const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection(); // conecta nosso controle de usuários com o database

    // verifica se o email existe
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    ); // ele procura dentro de toda a tabela se existe um email igual o do usuário que esta sendo criado esse (?) é substituido pelo dado(email) que foi informado entre []

    if (checkUserExists) {
      throw new AppError("Este email já existe.");
    }

    const passwordCrypted = await hash(password, 8); // atravez da bibliocteca hash conseguimos cryptografar nossa senha

    await database.run(
      "INSERT INTO users (name, email , password) VALUES (?, ?, ?)",
      [name, email, passwordCrypted] // ja passamos a senha criptografada
    ); // roda o codigo para adicionar um usuário , envia pro nosso banco de dados as informações que foram capturadas no request body

    return response.status(201).json();
  }
}

module.exports = usersController;
