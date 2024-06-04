const { hash, compare } = require("bcryptjs"); // importa uma função(compare) da biblioteca bcrypts que permie que a gente compare uma senha normal com uma criptografada
const AppError = require("../utils/AppError"); // importa o nosso capturador de erros
const sqliteConnection = require("../database/sqlite"); // importa a função que faz a conexão com nosso server
const UserCreateService = require("../services/UserCreateService");
const UserRepository = require("../repositories/UserRepository");

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body; // desestrutura os dados que foram informados pelo usuário
    const userRepository = new UserRepository();

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });
    return response.status(201).json({}); // caso dê certo ele avisa que foi criado com o status code 201
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body; // pega o name e email enviado pelo user
    const user_id = request.user.id;

    const database = await sqliteConnection(); // nos conecta com o database
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]); // basicamente seleciona a linha inteira com todos os dados do nosso usuário que teve o id informado como parametro, podemos usar user.nomeDoDado para acessar qualquer dado que esteja na tabela

    if (!user) {
      // caso não tenha nenhum user informado
      throw new AppError("usuário não encontrado");
    }

    const emailExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    ); // caso tente atualizar o email, ele verifica se esse email ja não foi cadastrado

    if (emailExist && emailExist.id !== user.id) {
      // caso o email exista e não for do mesmo usuário que está tentando atualizar, ele emite um erro
      throw new AppError("Esse email já foi cadastrado.");
    }

    // adiciona uma verificação pra atualizar nome ou email
    if (name) {
      // atualize apenas se tiver um nome novo informado
      user.name = name;
    }
    if (email) {
      // atualize apenas se tiver um email novo informado
      user.email = email;
    }

    // ALTERAÇÃO DE SENHA:
    // caso o usúario tenha informado uma nova senha, veja se ele passou a antiga senha
    if (password && !old_password) {
      // se não passou envie um erro
      throw new AppError("Digite sua senha antiga!");
    }

    // caso tenha informado uma nova senha e uma antiga senha:
    if (password && old_password) {
      const old_passwordCorrect = await compare(old_password, user.password); // ele verifica se a senha antiga realmente bate com a que estava no database

      if (!old_passwordCorrect) {
        // caso não seja verdadeira essa antiga senha envie um erro
        throw new AppError("Digite uma senha válida");
      }

      user.password = await hash(password, 8); // caso esteja correta , atualize a senha antiga para a senha que foi passada dessa vez(ja criptografando ela)
    }
    // roda o código que atualiza os dados la dentro da nossa tabela no database
    await database.run(
      `
    UPDATE users SET 
    password = ?,
    name = ?,
    email = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.password, user.name, user.email, user_id]
    );

    return response.json(); // retorna que foi criado com sucesso
  }
}

module.exports = usersController;
