const { hash } = require("bcryptjs"); // importa uma fução(hash) da biblioteca bcrypts que faz a senha fcar criptografada
const AppError = require("../utils/AppError"); // importa o nosso capturador de erros
const sqliteConnection = require("../database/sqlite"); // importa a função que faz a conexão com nosso server

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body; // desestrutura os dados que foram informados pelo usuário

    const database = await sqliteConnection(); // conecta nosso controle de usuários com o database

    // verifica se o email existe
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    ); // ele procura dentro de toda a tabela se existe um email igual o do usuário que esta sendo criado esse (?) é substituido pelo dado(email) que foi informado entre []

    if (checkUserExists) { // caso o email exista ele envia um novo erro
      throw new AppError("Este email já existe.");
    }

    // primeiro informamos o q queremos criptografar, depois onivel de criptografia que desejamos
    const passwordCrypted = await hash(password, 8); // atravez da bibliocteca bcrypts usamos a função hash e conseguimos cryptografar nossa senha, 


    // roda um código que cria um novo usuário dentro do nosso database
    await database.run( 
      "INSERT INTO users (name, email , password) VALUES (?, ?, ?)",
      [name, email, passwordCrypted] // passamos como parametro os dados capturados pelo request.body e a senha nos passamos ela jácriptografada
    ); 

    return response.status(201).json(); // caso dê certo ele avisa que foi criado com o status code 201
  }
}

module.exports = usersController;
