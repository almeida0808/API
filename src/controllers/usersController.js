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

    if (checkUserExists) {
      // caso o email exista ele envia um novo erro
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

  async update(request, response) {
    const { name, email} = request.body; // pega o name e email enviado pelo user
    const { id } = request.params; // pega o id que foi informado como parametro

    const database = await sqliteConnection(); // nos conecta com o database
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]); // seleciona dentro da tabela o usuário coom o id que foi informado como parametro

    if (!user) { // caso não tenha nenhum user informado
      throw new AppError("usuário não encontrado");
    }

    const emailExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]); // caso tente atualizar o email, ele verifica se esse email ja não foi cadastrado

    if (emailExist && emailExist.id !== user.id) { // caso o email exista e não for do mesmo usuário que está tentando atualizar, ele emite um erro
      throw new AppError("Esse email já foi cadastrado.");
    }

    // atualiza o email e nome que foi informado
    user.name = name 
    user.email = email

    // roda o código que atualiza os dados la dentro da nossa tabela no database
    await database.run(`
    UPDATE users SET 
    name = ?,
    email = ?,
    updated_at = ?
    WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.json(); // retorna que foi criado com sucesso
  }

}

module.exports = usersController;
